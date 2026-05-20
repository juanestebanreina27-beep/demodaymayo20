import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Music, Timer, MessageSquare, VolumeX, Pause } from 'lucide-react';
import { useAudioController, stopAllAudio, playSyntheticBeep, playChimeAlert } from '../../hooks/useAudioController';
import { AUDIO_PATHS, AUDIO_VOLUMES } from '../../data/content';

type ConsoleState = 'idle' | 'walkup' | 'pitch' | 'timesup' | 'feedback' | 'feedback-done';

interface PitchConsoleProps {
  groupNumber: number;
  entradaAudio: string;
  isCompact?: boolean;
}

export default function PitchConsole({ groupNumber, entradaAudio, isCompact }: PitchConsoleProps) {
  const [state, setState] = useState<ConsoleState>('idle');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [feedbackTime, setFeedbackTime] = useState(300);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const walkupAudio = useAudioController();
  const pitchAudio = useAudioController();
  const sfxAudio = useAudioController();
  const feedbackAudioCtrl = useAudioController();

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Timer runner for Pitch
  const startPitchTimer = useCallback((seconds: number) => {
    clearTimer();
    setState('pitch');
    setTimeLeft(seconds);
    pitchAudio.play(AUDIO_PATHS.pitchLoop, { loop: true, volume: AUDIO_VOLUMES.pitchLoop });

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setState('timesup');
          pitchAudio.stop();
          sfxAudio.play(AUDIO_PATHS.sfxTimesUp, { loop: false, volume: AUDIO_VOLUMES.sfxTimesUp });
          return 0;
        }

        const nextTime = prev - 1;

        // Alerta a falta de exactamente 1 minuto (60 segundos) -> Chime digital melodioso
        if (nextTime === 60) {
          playChimeAlert(0.45);
        }

        // Cuenta regresiva sonora en los últimos 10 segundos con tono incremental (tensión)
        if (nextTime <= 10 && nextTime > 0) {
          const baseFreq = 700; // Frecuencia base en Hz
          const incrementalFreq = baseFreq + (10 - nextTime) * 80; // Sube de 700Hz a 1420Hz
          playSyntheticBeep(incrementalFreq, 0.08, 'sine');
        }

        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, pitchAudio, sfxAudio]);

  // Timer runner for Feedback
  const startFeedbackTimer = useCallback((seconds: number) => {
    clearTimer();
    setState('feedback');
    setFeedbackTime(seconds);
    feedbackAudioCtrl.play(AUDIO_PATHS.deliberationLoop, { loop: true, volume: AUDIO_VOLUMES.deliberationLoop });

    timerRef.current = setInterval(() => {
      setFeedbackTime((prev) => {
        if (prev <= 1) {
          clearTimer();
          feedbackAudioCtrl.stop();
          setState('feedback-done');
          sfxAudio.play(AUDIO_PATHS.sfxTimesUp, { loop: false, volume: AUDIO_VOLUMES.sfxTimesUp });
          return 0;
        }

        const nextTime = prev - 1;

        // Alerta a falta de exactamente 1 minuto (60 segundos)
        if (nextTime === 60) {
          playChimeAlert(0.45);
        }

        // Cuenta regresiva sonora en los últimos 10 segundos con tono incremental
        if (nextTime <= 10 && nextTime > 0) {
          playSyntheticBeep(500 + (10 - nextTime) * 60, 0.08, 'triangle');
        }

        return prev - 1;
      });
    }, 1000);
  }, [clearTimer, feedbackAudioCtrl, sfxAudio]);

  // Walk-up: Play entrada audio
  const handleWalkup = useCallback(() => {
    setState('walkup');
    walkupAudio.play(entradaAudio, { loop: false, volume: AUDIO_VOLUMES.walkup });
  }, [entradaAudio, walkupAudio]);

  // Start Pitch: 5-min countdown + background music loop
  const handleStartPitch = useCallback(() => {
    startPitchTimer(300);
  }, [startPitchTimer]);

  // Start Feedback: 5-min countdown + deliberation music
  const handleStartFeedback = useCallback(() => {
    startFeedbackTimer(300);
  }, [startFeedbackTimer]);

  // Extend timer by 30 seconds (Grace Period)
  const handleExtend30s = useCallback(() => {
    if (state === 'pitch') {
      setTimeLeft((prev) => prev + 30);
    } else if (state === 'timesup') {
      startPitchTimer(30);
    } else if (state === 'feedback') {
      setFeedbackTime((prev) => prev + 30);
    } else if (state === 'feedback-done') {
      startFeedbackTimer(30);
    }
  }, [state, startPitchTimer, startFeedbackTimer]);

  // Mute all
  const handleMuteAll = useCallback(() => {
    stopAllAudio();
    setIsMuted(true);
    setTimeout(() => setIsMuted(false), 2000);
  }, []);

  // Reset
  const handleReset = useCallback(() => {
    clearTimer();
    stopAllAudio();
    setState('idle');
    setTimeLeft(300);
    setFeedbackTime(300);
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isTimesUp = state === 'timesup';
  const isPitch = state === 'pitch';
  const isFeedback = state === 'feedback';
  const isWalkup = state === 'walkup';

  const isFeedbackSafe = feedbackTime > 60;
  const isFeedbackWarning = feedbackTime <= 60 && feedbackTime > 15;
  const isFeedbackCritical = feedbackTime <= 15 && feedbackTime > 0;
  const isFeedbackDone = state === 'feedback-done';

  const getContainerStyles = () => {
    if (isTimesUp) {
      return {
        className: 'animate-pulse-glow !border-orange-intense',
        style: { borderColor: '#F25D07' }
      };
    }
    if (isFeedbackWarning) {
      return {
        className: '!border-orange-primary/50 shadow-md shadow-orange-primary/5',
        style: {}
      };
    }
    if (isFeedbackCritical || isFeedbackDone) {
      return {
        className: 'animate-pulse-glow !border-red-500',
        style: { borderColor: '#EF4444' }
      };
    }
    return {
      className: '',
      style: {}
    };
  };

  const containerStyleProps = getContainerStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`
        glass-strong rounded-2xl w-full transition-all duration-500
        ${isCompact ? 'p-3 md:p-4 max-w-[280px] border border-orange-primary/10 shadow-md' : 'p-5 max-w-[520px] shadow-lg'}
        ${containerStyleProps.className}
      `}
      style={containerStyleProps.style}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b border-gray-100/50 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-primary animate-pulse" />
          <span className={`font-semibold uppercase tracking-wider text-text-mid transition-all duration-300 ${
            isCompact ? 'text-[10px]' : 'text-xs'
          }`} style={{ fontFamily: 'var(--font-mono)' }}>
            {isCompact ? `G${groupNumber}` : `Consola — Grupo ${groupNumber}`}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleMuteAll}
            className={`p-1 rounded-lg transition-all duration-300 hover:bg-red-50 ${isMuted ? 'text-red-500' : 'text-text-light hover:text-red-500'}`}
            title="Silenciar Todo"
          >
            <VolumeX size={isCompact ? 14 : 16} />
          </button>
          <button
            onClick={handleReset}
            className="p-1 rounded-lg text-text-light hover:text-text-dark hover:bg-gray-100 transition-all duration-300"
            title="Reset"
          >
            <Square size={isCompact ? 12 : 14} />
          </button>
        </div>
      </div>

      {/* Timer Display */}
      <div className="text-center mb-3">
        <AnimatePresence mode="wait">
          {(isPitch || isTimesUp) && (
            <motion.div
              key="pitch-timer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative"
            >
              <div
                className={`font-bold tracking-tight transition-all duration-500 ${
                  isCompact ? 'text-3xl md:text-4xl' : 'text-5xl'
                } ${
                  isTimesUp
                    ? 'text-orange-intense glow-text-orange scale-105'
                    : (timeLeft <= 60 && timeLeft > 0)
                      ? 'text-orange-primary animate-pulse scale-102'
                      : 'text-text-dark'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatTime(timeLeft)}
              </div>
              <div className={`text-[10px] mt-0.5 uppercase tracking-wider font-semibold transition-colors duration-300 ${
                timeLeft <= 60 && !isTimesUp ? 'text-orange-primary' : 'text-text-light'
              }`}>
                {isTimesUp
                  ? '⚡ Fin'
                  : (timeLeft <= 60 && timeLeft > 0)
                    ? '⚠️ ¡Último Minuto!'
                    : 'Pitch'}
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: isTimesUp
                      ? '#F25D07'
                      : 'linear-gradient(90deg, #F28C0F, #F27507)',
                  }}
                  animate={{ width: `${((300 - timeLeft) / 300) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
          {isFeedback && (
            <motion.div
              key="feedback-timer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div
                className={`font-bold tracking-tight transition-all duration-500 ${
                  isCompact ? 'text-3xl md:text-4xl' : 'text-5xl'
                } ${
                  isFeedbackCritical
                    ? 'text-red-500 glow-text-red scale-105'
                    : isFeedbackWarning
                      ? 'text-orange-primary animate-pulse scale-102'
                      : 'text-green-ueb'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {formatTime(feedbackTime)}
              </div>
              <div className={`text-[10px] mt-0.5 uppercase tracking-wider font-semibold transition-colors duration-300 ${
                isFeedbackCritical
                  ? 'text-red-500 animate-pulse'
                  : isFeedbackWarning
                    ? 'text-orange-primary animate-pulse'
                    : 'text-green-ueb/80'
              }`}>
                {isFeedbackCritical
                  ? '🚨 ¡Tiempo agotándose!'
                  : isFeedbackWarning
                    ? '⚠️ ¡Último Minuto para Jueces!'
                    : '📢 Retroalimentación Activa'}
              </div>
              {/* Progress bar */}
              <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full transition-colors duration-500 ${
                    isFeedbackCritical
                      ? 'bg-red-500 shadow-glow-red'
                      : isFeedbackWarning
                        ? 'bg-orange-primary'
                        : 'bg-green-ueb/70'
                  }`}
                  animate={{ width: `${((300 - feedbackTime) / 300) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          )}
          {isFeedbackDone && (
            <motion.div
              key="feedback-done-display"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-center"
            >
              <div
                className="font-bold tracking-tight text-red-500 text-3xl md:text-4xl animate-pulse"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                00:00
              </div>
              <div className="text-[10px] text-red-500 font-extrabold mt-1 tracking-wider uppercase animate-pulse">
                🚨 ¡Feedback Excedido! Pasar al siguiente grupo
              </div>
            </motion.div>
          )}
          {(state === 'idle' || isWalkup) && (
            <motion.div
              key="idle-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={`font-bold text-text-dark/20 tracking-tight ${isCompact ? 'text-3xl md:text-4xl' : 'text-5xl'}`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                05:00
              </div>
              <div className="text-[10px] text-text-light mt-0.5 uppercase tracking-wider">
                {isWalkup ? '🎵 Entrada...' : 'Listo'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio Active Indicator (Equalizer) */}
      <AnimatePresence>
        {(isWalkup || isPitch || isFeedback) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-center gap-0.5 mb-2.5 py-1"
          >
            <Music size={isCompact ? 10 : 12} className="text-orange-primary mr-1" />
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-0.5 rounded-full bg-orange-primary eq-bar-${i}`}
                style={{ height: isCompact ? '12px' : '16px' }}
              />
            ))}
            {!isCompact && (
              <span className="text-[10px] text-text-light ml-2 uppercase tracking-wider">
                Audio activo
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className={`flex gap-2 transition-all duration-300 ${isCompact ? 'flex-col' : 'flex-row flex-wrap'}`}>
        {state === 'idle' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWalkup}
            className={`flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-primary to-orange-mid text-white font-semibold shadow-lg shadow-orange-primary/20 hover:shadow-orange-primary/40 transition-shadow ${
              isCompact ? 'py-1.5 px-3 text-xs w-full' : 'flex-1 py-2.5 px-4 text-sm'
            }`}
          >
            <Music size={isCompact ? 12 : 16} />
            {isCompact ? 'Entrada' : 'Play Entrada'}
          </motion.button>
        )}

        {(state === 'idle' || isWalkup) && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartPitch}
            className={`flex items-center justify-center gap-1.5 rounded-xl bg-text-dark text-white font-semibold shadow-lg hover:bg-gray-800 transition-colors ${
              isCompact ? 'py-1.5 px-3 text-xs w-full' : 'flex-1 py-2.5 px-4 text-sm'
            }`}
          >
            <Play size={isCompact ? 12 : 16} />
            {isCompact ? 'Iniciar Pitch' : 'Start Pitch'}
          </motion.button>
        )}

        {isTimesUp && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartFeedback}
            className={`flex items-center justify-center gap-1.5 rounded-xl bg-green-ueb text-white font-semibold shadow-lg shadow-green-ueb/20 hover:shadow-green-ueb/40 transition-shadow ${
              isCompact ? 'py-1.5 px-3 text-xs w-full' : 'flex-1 py-2.5 px-4 text-sm'
            }`}
          >
            <MessageSquare size={isCompact ? 12 : 16} />
            {isCompact ? 'Iniciar Feed' : 'Start Feedback'}
          </motion.button>
        )}

        {isPitch && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              clearTimer();
              pitchAudio.stop();
              setState('timesup');
              sfxAudio.play(AUDIO_PATHS.sfxTimesUp, { loop: false, volume: AUDIO_VOLUMES.sfxTimesUp });
              setTimeLeft(0);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-xl bg-orange-intense text-white font-semibold shadow-lg ${
              isCompact ? 'py-1.5 px-3 text-xs w-full' : 'flex-1 py-2.5 px-4 text-sm'
            }`}
          >
            <Pause size={isCompact ? 12 : 16} />
            {isCompact ? 'Fin Pitch' : 'Finalizar Pitch'}
          </motion.button>
        )}

        {isFeedback && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              clearTimer();
              feedbackAudioCtrl.stop();
              setState('feedback-done');
              sfxAudio.play(AUDIO_PATHS.sfxTimesUp, { loop: false, volume: AUDIO_VOLUMES.sfxTimesUp });
              setFeedbackTime(0);
            }}
            className={`flex items-center justify-center gap-1.5 rounded-xl border border-green-ueb text-green-ueb font-semibold hover:bg-green-ueb/5 transition-colors ${
              isCompact ? 'py-1.5 px-3 text-xs w-full' : 'flex-1 py-2.5 px-4 text-sm'
            }`}
          >
            <Square size={isCompact ? 10 : 14} />
            {isCompact ? 'Fin Feed' : 'Finalizar Feedback'}
          </motion.button>
        )}

        {(isPitch || isTimesUp || isFeedback || isFeedbackDone) && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExtend30s}
            className={`flex items-center justify-center gap-1.5 rounded-xl border border-orange-primary/30 text-orange-primary font-bold hover:bg-orange-primary/5 transition-colors ${
              isCompact ? 'py-1.5 px-3 text-xs w-full' : 'flex-1 py-2.5 px-4 text-sm'
            }`}
            title="Añadir 30 segundos extra de gracia"
          >
            <Timer size={isCompact ? 12 : 14} className="animate-pulse text-orange-primary" />
            +30s Extra
          </motion.button>
        )}

        {state === 'feedback-done' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className={`flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 text-text-mid font-semibold hover:bg-gray-50 transition-colors ${
              isCompact ? 'py-1.5 px-3 text-xs w-full' : 'flex-1 py-2.5 px-4 text-sm'
            }`}
          >
            <Timer size={isCompact ? 10 : 14} />
            {isCompact ? 'Reiniciar' : 'Reiniciar Consola'}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
