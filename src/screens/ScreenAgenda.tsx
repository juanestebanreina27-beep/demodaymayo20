import { motion } from 'framer-motion';
import { AGENDA_ITEMS } from '../data/content';
import { Calendar, ChevronRight } from 'lucide-react';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariant: any = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function ScreenAgenda() {
  return (
    <section className="screen-section flex items-center justify-center relative" id="screen-agenda" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 50%, #F3F4F6 100%)' }}>
      {/* Giant watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-giant-watermark select-none pointer-events-none">
        AGENDA
      </div>

      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 animate-breathe pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(242,140,15,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex flex-col items-center px-8 max-w-2xl w-full">
        {/* Section badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-orange text-xs font-semibold text-orange-primary uppercase tracking-widest">
            <Calendar size={12} />
            Programa del Evento
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-text-dark mb-4 md:mb-5 tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Agenda
        </motion.h2>

        {/* Timeline items */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full space-y-1.5 md:space-y-2"
        >
          {AGENDA_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariant}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="group flex items-center gap-2 p-2.5 md:p-3 rounded-xl glass hover:glass-orange cursor-default transition-all duration-300"
            >
              {/* Number circle */}
              <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-orange-primary to-orange-mid flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-md shadow-orange-primary/20">
                {index + 1}
              </div>

              {/* Text */}
              <span className="flex-1 text-xs md:text-sm font-medium text-text-dark group-hover:text-orange-mid transition-colors">
                {item}
              </span>

              {/* Arrow */}
              <ChevronRight size={18} className="text-text-light group-hover:text-orange-primary transition-colors" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
