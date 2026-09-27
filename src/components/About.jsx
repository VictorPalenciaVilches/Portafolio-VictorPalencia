import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { VIEWPORT, SECTION_CLASS } from '../constants/motion';
import SectionDivider from './SectionDivider';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className={SECTION_CLASS}>
      <SectionDivider />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex justify-center lg:justify-start"
        >
          <div className="w-full max-w-sm rounded-2xl border border-white/5 bg-[#111] p-6 shadow-[0_0_40px_rgba(6,182,212,0.08)] sm:p-8">
            <div className="mx-auto flex justify-center">
              <div className="h-44 w-44 rounded-full bg-gradient-to-br from-[#06b6d4] via-cyan-500 to-cyan-700 p-[3px] shadow-[0_0_32px_rgba(6,182,212,0.3)] sm:h-52 sm:w-52">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#141414]">
                  <span className="px-4 text-center text-sm font-medium text-gray-400">
                    {t.hero.photoPlaceholder}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <p className="text-center text-sm font-medium text-gray-300">
                {t.about.location}
              </p>
              <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 py-2.5 text-center text-sm font-medium text-emerald-400">
                {t.about.available}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="text-center lg:text-left"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4]">
            {t.about.tag}
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {t.about.title}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-gray-300 sm:text-lg">
            {t.about.p1}
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg">
            {t.about.p2}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
