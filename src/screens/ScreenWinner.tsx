import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, PartyPopper, Lock } from 'lucide-react';
import { useAudioController, ambientAudio } from '../hooks/useAudioController';
import { AUDIO_PATHS, AUDIO_VOLUMES, PROJECTS } from '../data/content';
import confetti from 'canvas-confetti';

// Confetti celebration sequences
function fireConfettiExplosion() {
  const duration = 6000;
  const end = Date.now() + duration;

  // UEB brand colors for confetti
  const colors = ['#F28C0F', '#F27507', '#F25D07', '#037334', '#FFD700', '#FFFFFF'];

  // Initial big bang from both sides
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { x: 0, y: 0.6 },
    colors,
    startVelocity: 55,
    gravity: 0.8,
    ticks: 300,
    shapes: ['square', 'circle'],
    scalar: 1.2,
  });
  confetti({
    particleCount: 100,
    spread: 80,
    origin: { x: 1, y: 0.6 },
    colors,
    startVelocity: 55,
    gravity: 0.8,
    ticks: 300,
    shapes: ['square', 'circle'],
    scalar: 1.2,
  });

  // Center explosion
  confetti({
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0.4 },
    colors,
    startVelocity: 45,
    gravity: 1,
    ticks: 250,
    shapes: ['square', 'circle'],
    scalar: 1.4,
  });

  // Sustained rain effect
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors,
      ticks: 200,
      gravity: 1.2,
      scalar: 0.9,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors,
      ticks: 200,
      gravity: 1.2,
      scalar: 0.9,
    });
  }, 80);
}

// Heartbeat synth that accelerates as countdown decreases
function playHeartbeat(countdownValue: number) {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Lower pitch = more tension, volume ramps up as countdown drops
    const baseFreq = 50 + (10 - countdownValue) * 5;   // 50 → 100 Hz
    const vol = 0.06 + (10 - countdownValue) * 0.025;   // 0.06 → 0.31

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (_) { /* silent fail */ }
}

export default function ScreenWinner() {
  const [revealed, setRevealed] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [warmup, setWarmup] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { play } = useAudioController();
  const inputRef = useRef<HTMLInputElement>(null);
  const tensionAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setInputValue('');
      setSelectedProjectId(null);
      setInputError('');
      return;
    }
    const num = parseInt(val.slice(-1), 10);
    if (num >= 1 && num <= PROJECTS.length) {
      setInputValue(val.slice(-1));
      setSelectedProjectId(num);
      setInputError('');
    } else {
      setInputError(`Ingresa un número entre 1 y ${PROJECTS.length}`);
    }
  };

  const handleReveal = () => {
    if (selectedProjectId === null) return;

    // Start the winner music at very low volume — 4s warmup before countdown
    ambientAudio.pause();
    const audio = new Audio(AUDIO_PATHS.winnerReveal);
    audio.volume = 0.03;
    audio.loop = false;
    tensionAudioRef.current = audio;
    audio.play().catch(() => {});

    setWarmup(true);
  };

  // Smooth volume ramp using requestAnimationFrame
  useEffect(() => {
    if (!warmup) return;

    const audio = tensionAudioRef.current;
    if (!audio) return;

    const startTime = Date.now();
    const warmupDuration = 6000;
    const countdownDuration = 10000;
    const totalDuration = warmupDuration + countdownDuration;

    let animationId: number;

    const updateVolume = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < warmupDuration) {
        // Warmup phase: 0.03 → 0.10 over 6s
        const progress = elapsed / warmupDuration;
        const currentVol = 0.03 + progress * 0.07;
        audio.volume = Math.max(0.03, Math.min(0.10, currentVol));
      } else if (elapsed < totalDuration) {
        // Countdown phase: 0.10 → 0.85 over 10s (cubic ease-in for building massive tension!)
        const progress = (elapsed - warmupDuration) / countdownDuration;
        const easedProgress = Math.pow(progress, 3); // Cubic ease-in
        const currentVol = 0.10 + easedProgress * (AUDIO_VOLUMES.winnerReveal - 0.10);
        audio.volume = Math.max(0.10, Math.min(AUDIO_VOLUMES.winnerReveal, currentVol));
      } else {
        // After 16 seconds (countdown reaches 0 / reveal happens)
        audio.volume = AUDIO_VOLUMES.winnerReveal;
      }

      if (elapsed < totalDuration) {
        animationId = requestAnimationFrame(updateVolume);
      }
    };

    animationId = requestAnimationFrame(updateVolume);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [warmup]);

  // Warmup phase: 6 seconds of music building before countdown starts
  useEffect(() => {
    if (!warmup) return;

    const timer = setTimeout(() => {
      setWarmup(false);
      setCountdown(10);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [warmup]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      // Reveal! Ramp to full volume
      setRevealed(true);
      setCountdown(null);
      if (tensionAudioRef.current) {
        tensionAudioRef.current.volume = Math.min(1, AUDIO_VOLUMES.winnerReveal);
      }
      // 🎊 FIRE THE CONFETTI EXPLOSION!
      fireConfettiExplosion();
      return;
    }

    // Play heartbeat synth for tension
    playHeartbeat(countdown);

    const timer = setTimeout(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (tensionAudioRef.current) {
        tensionAudioRef.current.pause();
        tensionAudioRef.current = null;
      }
    };
  }, []);

  // Determine which phase we are in for rendering
  const isIdle = !revealed && !warmup && countdown === null;
  const isBuilding = warmup || countdown !== null;

  return (
    <section
      className="screen-section flex items-center justify-center relative overflow-hidden"
      id="screen-winner"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 50%, #FFFFFF 100%)' }}
    >
      {/* Intense glow effects */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,93,7,0.12) 0%, rgba(242,140,15,0.06) 40%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,93,7,0.08) 0%, transparent 60%)',
          top: '30%',
          right: '10%',
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,117,7,0.06) 0%, transparent 60%)',
          bottom: '20%',
          left: '15%',
        }}
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Giant watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-giant-fill select-none pointer-events-none">
        GANADOR
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Trophy icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-primary to-orange-intense flex items-center justify-center shadow-xl shadow-orange-intense/30 glow-orange-intense">
            <Trophy size={36} className="text-white" />
          </div>
        </motion.div>

        {/* Expectation label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-orange text-sm font-bold text-orange-primary uppercase tracking-widest">
            <Sparkles size={14} />
            Y EL EQUIPO GANADOR ES...
          </span>
        </motion.div>

        {/* Reveal area */}
        <div className="mt-10 mb-8 min-h-[280px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {isIdle ? (
              <motion.div
                key="reveal-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-5 w-full max-w-sm"
              >
                {/* Password-style input */}
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2 text-text-light text-xs font-semibold uppercase tracking-widest mb-1">
                    <Lock size={12} />
                    Código secreto del ganador
                  </div>
                  <input
                    ref={inputRef}
                    type="password"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="•"
                    maxLength={1}
                    className="w-20 h-20 rounded-2xl bg-white/90 border-2 border-orange-primary/30 text-text-dark font-black text-3xl focus:outline-none focus:border-orange-primary focus:ring-4 focus:ring-orange-primary/20 shadow-sm transition-all text-center cursor-pointer"
                    autoComplete="off"
                  />
                  {inputError && (
                    <span className="text-red-500 text-xs font-medium mt-1">{inputError}</span>
                  )}
                  {selectedProjectId !== null && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-green-600 text-xs font-semibold mt-1"
                    >
                      ✓ Proyecto seleccionado
                    </motion.span>
                  )}
                </div>

                <motion.button
                  whileHover={selectedProjectId !== null ? { scale: 1.05, boxShadow: '0 20px 60px rgba(242, 93, 7, 0.35)' } : {}}
                  whileTap={selectedProjectId !== null ? { scale: 0.95 } : {}}
                  onClick={handleReveal}
                  disabled={selectedProjectId === null}
                  className={`relative group px-12 py-4 rounded-2xl text-white text-xl font-bold overflow-hidden transition-all duration-300 w-full flex justify-center ${
                    selectedProjectId === null 
                      ? 'bg-gray-300 cursor-not-allowed opacity-70' 
                      : 'bg-gradient-to-r from-orange-primary via-orange-mid to-orange-intense shadow-xl shadow-orange-primary/30'
                  }`}
                >
                  {selectedProjectId !== null && (
                    <span className="absolute inset-0 bg-white/15 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <PartyPopper size={24} />
                    Revelar Ganador
                  </span>
                </motion.button>
              </motion.div>
            ) : warmup ? (
              <motion.div
                key="warmup-phase"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center min-h-[280px] gap-6"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-primary/20 to-orange-intense/20 flex items-center justify-center"
                >
                  <Trophy size={40} className="text-orange-primary" />
                </motion.div>
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-lg font-extrabold uppercase tracking-widest text-orange-primary"
                >
                  Preparando el momento...
                </motion.span>
              </motion.div>
            ) : countdown !== null ? (
              <motion.div
                key="countdown-active"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center min-h-[280px]"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-base font-extrabold uppercase tracking-widest text-orange-primary mb-6"
                >
                  Revelando Ganador en...
                </motion.span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.3, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 2, opacity: 0, y: -30 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="text-9xl md:text-[12rem] lg:text-[14rem] font-black select-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      lineHeight: 1,
                      color: '#F25D07',
                      textShadow: '0 0 40px rgba(242,93,7,0.4), 0 0 80px rgba(242,93,7,0.2), 0 4px 12px rgba(0,0,0,0.1)',
                    }}
                  >
                    {countdown}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="winner-name"
                initial={{ opacity: 0, scale: 0.5, filter: 'blur(20px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-center w-full"
              >
                {(() => {
                  const winner = PROJECTS.find(p => p.id === selectedProjectId);
                  return (
                    <>
                      <div
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-orange-primary via-orange-mid to-orange-intense bg-clip-text text-transparent glow-text-orange animate-pulse-glow rounded-2xl p-2 md:p-4 mb-2 leading-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {winner?.name}
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8 max-w-4xl mx-auto"
                      >
                        {winner?.members.map((m, idx) => (
                          <span key={idx} className="px-5 py-2.5 bg-white border border-orange-primary/20 rounded-full text-sm md:text-base font-semibold text-text-dark shadow-sm hover:border-orange-primary/50 transition-colors">
                            {m.name}
                          </span>
                        ))}
                      </motion.div>
                    </>
                  );
                })()}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                  className="mt-10 text-text-mid text-base md:text-lg font-medium"
                >
                  🎉 ¡Felicitaciones al equipo ganador del Demo Day!
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-40 h-0.5 rounded-full bg-gradient-to-r from-transparent via-orange-primary/30 to-transparent mb-8"
        />

        {/* Thank you */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="text-6xl md:text-8xl font-bold text-text-dark tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          MUCHAS{' '}
          <span className="bg-gradient-to-r from-orange-primary to-orange-intense bg-clip-text text-transparent">
            GRACIAS
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          className="mt-4 text-text-mid text-sm"
        >
          Demo Day — Proyectos de Emprendimiento UEB · Universidad El Bosque
        </motion.p>
      </div>
    </section>
  );
}
