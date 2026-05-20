import { useRef, useCallback, useEffect } from 'react';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../data/content';

// ============================================================
// FADE UTILITY — smooth volume transitions using requestAnimationFrame
// ============================================================
function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number,
  onComplete?: () => void
): () => void {
  const startTime = performance.now();
  let rafId: number;

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    // Ease-out cubic for smoother feel
    const eased = 1 - Math.pow(1 - progress, 3);
    audio.volume = Math.max(0, Math.min(1, from + (to - from) * eased));

    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      audio.volume = Math.max(0, Math.min(1, to));
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(tick);

  // Return a cancel function
  return () => cancelAnimationFrame(rafId);
}

// ============================================================
// GLOBAL REGISTRY — enforce "one foreground audio at a time"
// ============================================================
const activeAudios: Set<HTMLAudioElement> = new Set();
let activeFadeCancel: (() => void) | null = null;

// ============================================================
// AMBIENT AUDIO MANAGER — background music with auto-ducking
// ============================================================
class AmbientManager {
  audio: HTMLAudioElement | null = null;
  isMutedByUser: boolean = false;
  isPlaying: boolean = false;
  private cancelFade: (() => void) | null = null;

  get targetVolume() {
    return AUDIO_VOLUMES.ambientLoop;
  }

  init() {
    if (this.audio) return;
    this.audio = new Audio(AUDIO_PATHS.ambientLoop);
    this.audio.loop = true;
    this.audio.volume = 0;
  }

  play() {
    if (!this.audio) this.init();
    if (this.isMutedByUser || activeAudios.size > 0) return;

    this.isPlaying = true;
    this.audio?.play().catch(e => console.warn("Ambient play blocked:", e));
    // Fade in
    this.cancelCurrentFade();
    if (this.audio) {
      this.cancelFade = fadeVolume(this.audio, 0, this.targetVolume, AUDIO_VOLUMES.fadeInMs);
    }
  }

  pause() {
    this.isPlaying = false;
    this.cancelCurrentFade();
    if (this.audio) {
      this.cancelFade = fadeVolume(this.audio, this.audio.volume, 0, AUDIO_VOLUMES.fadeOutMs, () => {
        this.audio?.pause();
      });
    }
  }

  toggleMute() {
    this.isMutedByUser = !this.isMutedByUser;
    if (this.isMutedByUser) {
      this.pause();
    } else if (activeAudios.size === 0) {
      this.play();
    }
  }

  private cancelCurrentFade() {
    if (this.cancelFade) {
      this.cancelFade();
      this.cancelFade = null;
    }
  }
}

export const ambientAudio = new AmbientManager();

// ============================================================
// stopAllAudio — fade-out everything gracefully, then resume ambient
// ============================================================
export function stopAllAudio() {
  // Cancel any active foreground fade
  if (activeFadeCancel) {
    activeFadeCancel();
    activeFadeCancel = null;
  }

  activeAudios.forEach((audio) => {
    fadeVolume(audio, audio.volume, 0, AUDIO_VOLUMES.fadeOutMs, () => {
      audio.pause();
      audio.currentTime = 0;
    });
  });
  activeAudios.clear();
  ambientAudio.play();
}

// ============================================================
// useAudioController — hook for components to play/stop audio
// with automatic fade in/out and configurable volume
// ============================================================
export function useAudioController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cancelFadeRef = useRef<(() => void) | null>(null);

  const play = useCallback((src: string, options?: { loop?: boolean; volume?: number }) => {
    // Fade-out & stop any currently active audio
    stopAllAudio();
    ambientAudio.pause(); // Auto-duck ambient music

    const targetVolume = options?.volume ?? 0.7;
    const audio = new Audio(src);
    audio.loop = options?.loop ?? false;
    audio.volume = 0; // Start silent for fade-in
    audioRef.current = audio;
    activeAudios.add(audio);

    audio.addEventListener('ended', () => {
      activeAudios.delete(audio);
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
      if (activeAudios.size === 0) {
        ambientAudio.play();
      }
    });

    audio.play().catch((err) => {
      console.warn('Audio play blocked by browser policy:', err);
    });

    // Fade in to target volume
    cancelFadeRef.current = fadeVolume(audio, 0, targetVolume, AUDIO_VOLUMES.fadeInMs);
    activeFadeCancel = cancelFadeRef.current;

    return audio;
  }, []);

  const stop = useCallback(() => {
    // Cancel any in-progress fade
    if (cancelFadeRef.current) {
      cancelFadeRef.current();
      cancelFadeRef.current = null;
    }

    const audio = audioRef.current;
    if (audio) {
      // Fade out then clean up
      cancelFadeRef.current = fadeVolume(audio, audio.volume, 0, AUDIO_VOLUMES.fadeOutMs, () => {
        audio.pause();
        audio.currentTime = 0;
        activeAudios.delete(audio);
        if (audioRef.current === audio) {
          audioRef.current = null;
        }
        if (activeAudios.size === 0) {
          ambientAudio.play();
        }
      });
    }
  }, []);

  const fadeOut = useCallback((duration: number = 1000) => {
    // Cancel any in-progress fade
    if (cancelFadeRef.current) {
      cancelFadeRef.current();
      cancelFadeRef.current = null;
    }

    const audio = audioRef.current;
    if (!audio) return;

    cancelFadeRef.current = fadeVolume(audio, audio.volume, 0, duration, () => {
      audio.pause();
      audio.currentTime = 0;
      activeAudios.delete(audio);
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
      if (activeAudios.size === 0) {
        ambientAudio.play();
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (cancelFadeRef.current) {
        cancelFadeRef.current();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        activeAudios.delete(audioRef.current);
        audioRef.current = null;
      }
    };
  }, []);

  return { play, stop, fadeOut, audioRef, stopAllAudio };
}

// ============================================================
// SINTETIZADOR WEB AUDIO API — Genera sonidos sin usar archivos
// ============================================================
export function playSyntheticBeep(frequency = 800, duration = 0.1, type: OscillatorType = 'sine') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Envolvente de volumen para evitar clics acústicos abruptos
    gain.gain.setValueAtTime(0.12, ctx.currentTime); // Volumen suave (12%)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (error) {
    console.warn('Fallo al reproducir pitido sintético:', error);
  }
}

// ============================================================
// playChimeAlert — Acorde melodioso digital tipo campana (C5, E5, G5)
// ============================================================
export function playChimeAlert(volume = 0.45) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    const playNote = (freq: number, startDelay: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Onda triangular para timbre suave similar a marimba/campana
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startDelay);

      gain.gain.setValueAtTime(0, ctx.currentTime + startDelay);
      // Ataque de sonido rápido
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + startDelay + 0.04);
      // Decaimiento exponencial para resonancia fluida
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startDelay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + startDelay);
      osc.stop(ctx.currentTime + startDelay + duration);
    };

    // Arpegio de triada mayor brillante
    playNote(523.25, 0, 0.6);      // Nota C5 (Do)
    playNote(659.25, 0.12, 0.6);   // Nota E5 (Mi)
    playNote(783.99, 0.24, 0.8);   // Nota G5 (Sol)
  } catch (error) {
    console.warn('Fallo al reproducir chime sintético:', error);
  }
}


