import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText } from 'lucide-react';
import PitchConsole from './PitchConsole/PitchConsole';
import type { PitchProject } from '../data/content';

interface PitchScreenProps {
  project: PitchProject;
  screenIndex: number;
}

export default function PitchTemplate({ project, screenIndex }: PitchScreenProps) {
  const [activeTab, setActiveTab] = useState<'members' | 'pdf'>('members');

  return (
    <section
      className="screen-section flex items-center justify-center relative"
      id={`screen-pitch-${project.id}`}
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 50%, #FFFFFF 100%)' }}
    >
      {/* Giant watermark project name */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none px-8"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 10vw, 10rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(26, 26, 26, 0.04)',
        }}
      >
        {project.name}
      </div>

      {/* Decorative glow orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,140,15,0.06) 0%, transparent 70%)',
          top: '15%',
          right: '10%',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(242,117,7,0.05) 0%, transparent 70%)',
          bottom: '10%',
          left: '5%',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Main content card */}
      <div className={`relative z-10 w-full mx-auto px-6 flex flex-col items-center gap-6 transition-all duration-500 ${
        activeTab === 'pdf' ? 'max-w-[96vw]' : 'max-w-6xl'
      }`}>
        {/* Project number badge */}
        <AnimatePresence>
          {activeTab !== 'pdf' && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.8 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.8 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-primary to-orange-mid text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-orange-primary/20">
                Proyecto {project.id}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Title */}
        <AnimatePresence>
          {activeTab !== 'pdf' && (
            <motion.h2
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark text-center tracking-tight leading-tight overflow-hidden"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.name}
            </motion.h2>
          )}
        </AnimatePresence>

        {/* Glass card with two columns: Team & Console */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`glass-strong rounded-3xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center transition-all duration-500 ${
            activeTab === 'pdf' ? 'p-4 md:p-6 lg:p-8' : 'p-6 md:p-10'
          }`}
        >
          {/* Left column: Team members / PDF presentation tabs */}
          <div className={`flex flex-col h-full justify-center transition-all duration-500 ${
            activeTab === 'pdf' ? 'md:col-span-10' : 'md:col-span-6'
          }`}>
            {/* Tabs for switching between Members and PDF */}
            {project.pdfPath && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-gray-200/50 pb-3">
                {activeTab === 'pdf' ? (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <span className="px-2.5 py-1 rounded bg-orange-primary/10 text-orange-primary text-[10px] font-bold uppercase tracking-wider">
                      Proyecto {project.id}
                    </span>
                    <span className="text-base md:text-lg font-bold text-text-dark tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {project.name}
                    </span>
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-orange-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-orange-primary">
                      {project.tag || 'INTEGRANTES'}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('members')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'members'
                        ? 'bg-orange-primary/10 text-orange-primary shadow-sm'
                        : 'text-text-light hover:text-text-mid hover:bg-gray-100/50'
                    }`}
                  >
                    <Users size={14} />
                    Integrantes
                  </button>
                  <button
                    onClick={() => setActiveTab('pdf')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                      activeTab === 'pdf'
                        ? 'bg-orange-primary/10 text-orange-primary shadow-sm'
                        : 'text-text-light hover:text-text-mid hover:bg-gray-100/50'
                    }`}
                  >
                    <FileText size={14} />
                    Presentación PDF
                  </button>
                </div>
              </div>
            )}

            {!project.pdfPath && (
              <div className="flex items-center gap-3 mb-6">
                <Users size={24} className="text-orange-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-orange-primary">
                  {project.tag}
                </span>
              </div>
            )}

            {activeTab === 'members' ? (
              <ul className="space-y-4">
                {project.members.map((member, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex items-center gap-4 text-base md:text-lg text-text-dark font-medium"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-primary/15 to-orange-mid/10 flex items-center justify-center text-sm font-bold text-orange-primary flex-shrink-0 shadow-sm border border-orange-primary/10">
                      {member.name.charAt(0)}
                    </div>
                    {member.name}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-[500px] md:h-[75vh] xl:h-[78vh] rounded-2xl overflow-hidden border border-gray-200/80 shadow-md bg-white transition-all duration-500"
              >
                <iframe
                  src={`${project.pdfPath}#toolbar=0&navpanes=0`}
                  className="w-full h-full border-0"
                  title={`Presentación de ${project.name}`}
                />
              </motion.div>
            )}
          </div>

          {/* Right column: PitchConsole */}
          <div className={`flex flex-col items-center md:items-end w-full h-full justify-between transition-all duration-500 ${
            activeTab === 'pdf' ? 'md:col-span-2' : 'md:col-span-6'
          }`}>
            <div className="w-full flex justify-end">
              <PitchConsole
                groupNumber={project.id}
                entradaAudio={project.audioEntrada}
                isCompact={activeTab === 'pdf'}
              />
            </div>
            
            {/* Project number decorative */}
            {activeTab !== 'pdf' && (
              <div className="mt-8 md:mt-auto w-full text-center md:text-right">
                <span
                  className="text-8xl lg:text-9xl font-bold opacity-[0.04] leading-none select-none"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  0{project.id}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
