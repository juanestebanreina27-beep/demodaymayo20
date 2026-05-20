import { motion } from 'framer-motion';
import { JURORS } from '../data/content';
import { Award, User } from 'lucide-react';

const cardVariants: any = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ScreenJury() {
  return (
    <section className="screen-section flex items-center justify-center relative" id="screen-jury" style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 50%, #F8F9FA 100%)' }}>
      {/* Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-giant-watermark select-none pointer-events-none">
        JURADOS
      </div>

      {/* Glow orbs */}
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-20 animate-breathe pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(242,117,7,0.15) 0%, transparent 70%)' }} />

      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-7xl 2xl:max-w-[1400px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-1"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-orange text-[10px] font-semibold text-orange-primary uppercase tracking-widest">
            <Award size={10} />
            Panel de Expertos
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-4 tracking-tight text-center"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Jurados
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xl:gap-5 w-full">
          {JURORS.map((juror, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass-strong rounded-xl p-3 md:p-4 xl:p-6 flex flex-col items-center text-center animate-float-slow group"
              style={{ animationDelay: `${index * 0.8}s` }}
            >
              {/* Photo placeholder */}
              <div className="w-16 h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-2 xl:mb-3 overflow-hidden border-2 border-white/60 shadow-md group-hover:shadow-lg group-hover:border-orange-primary/30 transition-all duration-500">
                <img
                  src={juror.image}
                  alt={juror.name}
                  className="w-full h-full"
                  style={{
                    objectFit: juror.objectFit || 'cover',
                    objectPosition: juror.objectPosition || 'center',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `<div class="flex flex-col items-center justify-center w-full h-full text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>`;
                  }}
                />
              </div>

              {/* Name */}
              <h3 className="text-base md:text-lg xl:text-xl font-bold text-text-dark mb-0.5 tracking-tight">
                {juror.name}
              </h3>

              {/* Focus */}
              <p className="text-xs md:text-sm xl:text-base font-medium text-orange-primary mb-1.5 xl:mb-2 leading-snug">
                {juror.focus}
              </p>

              {/* Divider */}
              <div className="w-8 h-0.5 rounded-full bg-gradient-to-r from-orange-primary/30 to-transparent mb-1.5 xl:mb-2" />

              {/* Experience */}
              <p className="text-[10px] md:text-xs xl:text-sm text-text-mid leading-relaxed">
                {juror.experience}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
