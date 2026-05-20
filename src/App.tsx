import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { ambientAudio } from './hooks/useAudioController';

// Screens
import ScreenWelcome from './screens/ScreenWelcome';
import ScreenAgenda from './screens/ScreenAgenda';
import ScreenHubTeam from './screens/ScreenHubTeam';
import ScreenJury from './screens/ScreenJury';
import ScreenRules from './screens/ScreenRules';
import ScreenWinner from './screens/ScreenWinner';

// Template & Data
import PitchTemplate from './components/PitchTemplate';
import { PROJECTS } from './data/content';

const FIXED_SCREENS = 5; // Welcome, Agenda, Hub, Jury, Rules
const TOTAL_SCREENS = FIXED_SCREENS + PROJECTS.length + 1; // +1 for Winner
const SCROLL_SENSITIVITY = 1.2;

export default function App() {
  const [scrollLocked, setScrollLocked] = useState(true);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isAmbientMuted, setIsAmbientMuted] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth horizontal scrolling
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.8,
  });

  // Transform progress (0 to 1) into translateX
  const translateX = useTransform(
    smoothProgress,
    [0, 1],
    ['0vw', `-${(TOTAL_SCREENS - 1) * 100}vw`]
  );

  // Handle wheel events
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (scrollLocked) return;
      e.preventDefault();

      const delta = e.deltaY || e.deltaX;
      const normalizedDelta = delta * SCROLL_SENSITIVITY;
      const maxScroll = (TOTAL_SCREENS - 1) * window.innerWidth;
      const scrollAmount = normalizedDelta / maxScroll;

      scrollProgress.set(
        Math.max(0, Math.min(1, scrollProgress.get() + scrollAmount))
      );

      // Update current screen index for progress indicator
      const newScreen = Math.round(scrollProgress.get() * (TOTAL_SCREENS - 1));
      setCurrentScreen(newScreen);
    },
    [scrollLocked, scrollProgress]
  );

  // Touch support
  const touchStartRef = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (scrollLocked) return;
      e.preventDefault();

      const touchDelta = touchStartRef.current - e.touches[0].clientX;
      touchStartRef.current = e.touches[0].clientX;

      const maxScroll = (TOTAL_SCREENS - 1) * window.innerWidth;
      const scrollAmount = (touchDelta * 2) / maxScroll;

      scrollProgress.set(
        Math.max(0, Math.min(1, scrollProgress.get() + scrollAmount))
      );

      const newScreen = Math.round(scrollProgress.get() * (TOTAL_SCREENS - 1));
      setCurrentScreen(newScreen);
    },
    [scrollLocked, scrollProgress]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (scrollLocked) return;

      const step = 1 / (TOTAL_SCREENS - 1);
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const newVal = Math.min(1, scrollProgress.get() + step);
        scrollProgress.set(newVal);
        setCurrentScreen(Math.round(newVal * (TOTAL_SCREENS - 1)));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const newVal = Math.max(0, scrollProgress.get() - step);
        scrollProgress.set(newVal);
        setCurrentScreen(Math.round(newVal * (TOTAL_SCREENS - 1)));
      }
    },
    [scrollLocked, scrollProgress]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleKeyDown]);

  const handleUnlockScroll = useCallback(() => {
    setScrollLocked(false);
    // Start ambient music when the user starts the experience
    if (!ambientAudio.isMutedByUser) {
      ambientAudio.play();
    }
  }, []);

  return (
    <div ref={containerRef} className={`w-screen h-screen overflow-hidden relative transition-colors duration-700 ${isCinemaMode ? 'cinema-mode bg-slate-900' : 'bg-bg-snow'}`}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100/50">
        <motion.div
          className="h-full rounded-r-full"
          style={{
            background: 'linear-gradient(90deg, #F28C0F, #F27507, #F25D07)',
            scaleX: smoothProgress,
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Floating Controls */}
      {!scrollLocked && (
        <div className="fixed bottom-6 left-6 z-50 flex gap-3">
          {/* Ambient Audio Toggle */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            onClick={() => {
              ambientAudio.toggleMute();
              setIsAmbientMuted(ambientAudio.isMutedByUser);
            }}
            className="p-3 rounded-full glass-strong text-text-mid hover:text-orange-primary hover:scale-110 transition-all shadow-lg flex items-center justify-center"
            title={isAmbientMuted ? "Activar música ambiente" : "Silenciar música ambiente"}
          >
            {isAmbientMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>

          {/* Cinema Mode Toggle */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            onClick={() => setIsCinemaMode(!isCinemaMode)}
            className="p-3 rounded-full glass-strong text-text-mid hover:text-orange-primary hover:scale-110 transition-all shadow-lg flex items-center justify-center"
            title={isCinemaMode ? "Desactivar Modo Cine" : "Activar Modo Cine"}
          >
            {isCinemaMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      )}

      {/* Screen indicator dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {Array.from({ length: TOTAL_SCREENS }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (scrollLocked) return;
              const val = i / (TOTAL_SCREENS - 1);
              scrollProgress.set(val);
              setCurrentScreen(i);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentScreen === i
                ? 'bg-orange-primary scale-125 shadow-md shadow-orange-primary/30'
                : 'bg-gray-300/50 hover:bg-gray-400/70'
            }`}
            title={`Pantalla ${i + 1}`}
          />
        ))}
      </div>

      {/* Horizontal scroll container */}
      <motion.div
        className="flex h-full"
        style={{ x: translateX }}
      >
        {/* Screen 1: Welcome */}
        <ScreenWelcome onUnlockScroll={handleUnlockScroll} />

        {/* Screen 2: Agenda */}
        <ScreenAgenda />

        {/* Screen 3: HUB Entrepreneurship Team */}
        <ScreenHubTeam />

        {/* Screen 4: Jury */}
        <ScreenJury />

        {/* Screen 5: Rules & Criteria */}
        <ScreenRules />

        {/* Screens 6 to N: Pitch projects */}
        {PROJECTS.map((project, i) => (
          <PitchTemplate key={project.id} project={project} screenIndex={i + FIXED_SCREENS + 1} />
        ))}

        {/* Last Screen: Winner */}
        <ScreenWinner />
      </motion.div>
    </div>
  );
}
