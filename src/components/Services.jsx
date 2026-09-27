import { motion } from 'framer-motion';
import {
  FaCode,
  FaServer,
  FaBoxes,
  FaMobileAlt,
} from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { VIEWPORT, SECTION_CLASS } from '../constants/motion';
import SectionDivider from './SectionDivider';

const ICON_MAP = {
  FaCode,
  FaServer,
  FaBoxes,
  FaMobileAlt,
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className={SECTION_CLASS}>
      <SectionDivider />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4]">
            {t.services.tag}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.services.title}
          </h2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {t.services.items.map((item) => {
            const Icon = ICON_MAP[item.icon];

            return (
              <motion.article
                key={item.icon}
                variants={cardVariants}
                className="group rounded-xl border border-white/5 bg-[#111] p-6 transition-all duration-300 hover:border-[#06b6d4]/60 hover:shadow-[0_0_28px_rgba(6,182,212,0.2)] sm:p-8"
              >
                <div className="mb-5 inline-flex rounded-lg bg-cyan-500/10 p-3 text-[#06b6d4] transition-colors group-hover:bg-cyan-500/20">
                  {Icon && <Icon size={28} aria-hidden />}
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                  {item.desc}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
