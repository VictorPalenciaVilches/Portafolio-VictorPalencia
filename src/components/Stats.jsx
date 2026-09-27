import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { VIEWPORT, SECTION_CLASS } from '../constants/motion';
import SectionDivider from './SectionDivider';

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/** Parse stat value — supports "3+", "8vo", "8th" (static) or numeric count-up */
function parseStatNumber(value) {
  const str = String(value);
  const match = str.match(/^(\d+)(.*)$/);
  if (!match) {
    return { isStatic: true, display: str };
  }
  return {
    isStatic: false,
    end: parseInt(match[1], 10),
    suffix: match[2],
  };
}

function useCountUp(end, isInView, duration = 1800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame((now) => {
      setCount(0);
      tick(now);
    });

    return () => cancelAnimationFrame(frameId);
  }, [end, isInView, duration]);

  return count;
}

function StatCard({ number, label, isInView }) {
  const parsed = parseStatNumber(number);
  const count = useCountUp(parsed.isStatic ? 0 : parsed.end, isInView && !parsed.isStatic);

  return (
    <motion.div
      variants={cardVariants}
      className="rounded-xl border border-white/5 bg-[#111] px-4 py-8 text-center shadow-[0_0_24px_rgba(6,182,212,0.08)] transition-shadow hover:shadow-[0_0_32px_rgba(6,182,212,0.18)] sm:px-6 sm:py-10"
    >
      <p className="text-3xl font-bold text-[#06b6d4] sm:text-5xl">
        {parsed.isStatic ? parsed.display : `${count}${parsed.suffix}`}
      </p>
      <p className="mt-3 text-xs font-medium text-gray-300 sm:text-base">
        {label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, VIEWPORT);

  return (
    <section id="stats" ref={sectionRef} className={SECTION_CLASS}>
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
            {t.stats.tag}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.stats.title}
          </h2>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
        >
          {t.stats.items.map((item) => (
            <StatCard
              key={item.label}
              number={item.number}
              label={item.label}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
