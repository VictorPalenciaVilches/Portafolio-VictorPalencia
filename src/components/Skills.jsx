import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { VIEWPORT, SECTION_CLASS } from '../constants/motion';
import SectionDivider from './SectionDivider';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const pillsContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className={SECTION_CLASS}>
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
            {t.skills.tag}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.skills.title}
          </h2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-8"
        >
          {t.skills.categories.map((category) => (
            <motion.div key={category.name} variants={categoryVariants}>
              <h3 className="mb-4 text-lg font-semibold text-[#06b6d4]">
                {category.name}
              </h3>

              <motion.ul
                variants={pillsContainerVariants}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill) => (
                  <motion.li key={skill} variants={pillVariants}>
                    <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-gray-200 transition-colors hover:border-[#06b6d4]/60 hover:bg-cyan-500/20 hover:text-white">
                      {skill}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
