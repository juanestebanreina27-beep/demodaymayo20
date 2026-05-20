import { motion } from 'framer-motion';
import { RULES, CRITERIA } from '../data/content';
import { Shuffle, Clock, MessageSquare, CheckCircle, Trophy, Scale, Target } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Shuffle: <Shuffle className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />,
  Clock: <Clock className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />,
  MessageSquare: <MessageSquare className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />,
  CheckCircle: <CheckCircle className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />,
  Trophy: <Trophy className="w-5 h-5 md:w-6 md:h-6 xl:w-8 xl:h-8" />,
};

const ruleVariants: any = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const criteriaVariants: any = {
  hidden: { opacity: 0, x: 30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ScreenRules() {
  return (
    <section className="screen-section flex items-center justify-center relative" id="screen-rules" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)' }}>
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-giant-watermark select-none pointer-events-none">
        REGLAS
      </div>

      {/* Glow */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20 animate-breathe pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(242,140,15,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col lg:flex-row items-start justify-center gap-4 px-6 w-full max-w-7xl 2xl:max-w-[1400px] h-full py-4 md:py-6">
        {/* LEFT PANEL - Rules */}
        <div className="flex-1 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-orange text-xs font-semibold text-orange-primary uppercase tracking-widest">
              <Scale size={12} />
              Reglas y Condiciones
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-2 md:mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Reglas y Condiciones
          </motion.h2>

          <div className="space-y-1.5 md:space-y-2">
            {RULES.map((rule, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={ruleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="flex items-start gap-2.5 xl:gap-3 p-2 md:p-3 xl:p-4 rounded-xl glass hover:glass-orange transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 rounded-xl bg-gradient-to-br from-orange-primary to-orange-mid flex items-center justify-center text-white shadow-md shadow-orange-primary/15 group-hover:shadow-orange-primary/30 transition-shadow">
                  {iconMap[rule.icon] || <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 xl:w-5 xl:h-5" />}
                </div>
                <div>
                  <span className="text-xs md:text-sm xl:text-base font-bold text-text-dark">{rule.label}:</span>
                  <span className="text-xs md:text-sm xl:text-base text-text-mid ml-1">{rule.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-[60%] my-auto bg-gradient-to-b from-transparent via-orange-primary/20 to-transparent" />

        {/* RIGHT PANEL - Criteria */}
        <div className="flex-1 flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-orange text-xs font-semibold text-orange-primary uppercase tracking-widest">
              <Target size={12} />
              Criterios de Evaluación
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-2 md:mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Criterios
          </motion.h2>

          <div className="space-y-2 md:space-y-3">
            {CRITERIA.map((criterion, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={criteriaVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs md:text-sm xl:text-base font-semibold text-text-dark">{criterion.label}</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold bg-orange-primary/10 text-orange-primary">
                    Evaluable
                  </span>
                </div>
                <div className="h-3 md:h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #F28C0F, #F27507, #F25D07)`,
                    }}
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
