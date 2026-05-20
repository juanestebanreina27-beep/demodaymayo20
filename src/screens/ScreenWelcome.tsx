import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, X } from 'lucide-react';

interface Props {
  onUnlockScroll: () => void;
}

export default function ScreenWelcome({ onUnlockScroll }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  const handleOpenVideo = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (!scrollUnlocked) {
      setScrollUnlocked(true);
      onUnlockScroll();
    }
  };

  return (
    <section className="screen-section gradient-mesh-hero flex items-center justify-center" id="screen-welcome">
      {/* Decorative floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full animate-breathe"
          style={{
            background: 'radial-gradient(circle, rgba(242,140,15,0.07) 0%, transparent 70%)',
            top: '10%',
            right: '-5%',
          }}
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(242,117,7,0.05) 0%, transparent 70%)',
            bottom: '5%',
            left: '-3%',
          }}
          animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Giant watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-giant-fill select-none pointer-events-none">
          DEMO DAY
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-orange text-sm font-semibold text-orange-primary uppercase tracking-widest">
            <Sparkles size={14} />
            Demo Day
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-8 text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-text-dark"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Proyectos de{' '}
          <span className="bg-gradient-to-r from-orange-primary via-orange-mid to-orange-intense bg-clip-text text-transparent">
            emprendimiento
          </span>{' '}
          UEB
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-lg text-text-mid max-w-xl"
        >
          Universidad El Bosque — Una experiencia inmersiva de innovación y emprendimiento
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(242, 93, 7, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenVideo}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-primary via-orange-mid to-orange-intense text-white text-lg font-semibold shadow-xl shadow-orange-primary/25 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <Play size={22} className="relative z-10" />
            <span className="relative z-10">Comenzar Experiencia</span>
          </motion.button>
        </motion.div>

        {/* Scroll hint (only after unlock) */}
        <AnimatePresence>
          {scrollUnlocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span className="text-xs text-text-light uppercase tracking-widest">Desplaza para continuar</span>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-orange-primary"
              >
                →
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[90vw] max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              >
                <X size={20} />
              </button>
              {/* Placeholder overlay behind the video */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 pointer-events-none">
                <div className="text-center text-white/50">
                  <Play size={64} className="mx-auto mb-4 opacity-30" />
                  <p className="text-sm">Video: /assets/video/intro_demo_day.mp4</p>
                  <p className="text-xs mt-1 opacity-50">Cierra este modal para desbloquear el scroll</p>
                </div>
              </div>

              <video
                className="absolute inset-0 w-full h-full object-contain z-10"
                autoPlay
                playsInline
                controls
                onEnded={handleCloseModal}
                src="/assets/video/intro_demo_day.mp4"
                onError={(e) => {
                  (e.target as HTMLVideoElement).style.opacity = '0';
                }}
              >
                <source src="/assets/video/intro_demo_day.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
