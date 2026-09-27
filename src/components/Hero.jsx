import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { SCROLL_OFFSET } from '../constants/motion';
const TYPING_SPEED_MS = 85;

/** Staggered container for hero children */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/** Each child fades in from below */
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

/** Typewriter subtitle — remounts when `text` changes (language toggle) */
function TypewriterRole({ text, speed = TYPING_SPEED_MS }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <>
      {displayed}
      <span
        className={`ml-0.5 inline-block w-[3px] bg-[#06b6d4] align-middle ${
          done ? 'animate-pulse' : 'opacity-100'
        }`}
        style={{ height: '1.1em' }}
        aria-hidden
      />
    </>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#0a0a0a] px-4 pb-16 pt-24 sm:px-6 lg:px-8"
    >
      {/* Subtle cyan radial glow behind text area */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(6,182,212,0.12)_0%,transparent_65%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy and CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          {/* Availability label */}
          <motion.p
            variants={itemVariants}
            className="mb-4 inline-block text-sm font-medium tracking-wide text-gray-400"
          >
            {t.hero.available}{' '}
            <span className="text-emerald-400" aria-hidden>
              🟢
            </span>
          </motion.p>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t.hero.greeting}
          </motion.h1>

          {/* Subtitle with typewriter — restarts when language changes */}
          <motion.h2
            variants={itemVariants}
            className="mt-4 min-h-[3rem] text-2xl font-semibold text-[#06b6d4] sm:min-h-[2.75rem] sm:text-3xl"
          >
            <TypewriterRole key={t.hero.role} text={t.hero.role} />
          </motion.h2>

          {/* Short bio */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg lg:mx-0"
          >
            {t.hero.description}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link
              to="projects"
              spy
              smooth
              offset={SCROLL_OFFSET}
              duration={500}
              className="w-full cursor-pointer rounded-lg bg-[#06b6d4] px-8 py-3.5 text-center text-sm font-semibold text-[#0a0a0a] transition-all hover:bg-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.45)] sm:w-auto"
            >
              {t.hero.btnWork}
            </Link>
            <Link
              to="contact"
              spy
              smooth
              offset={SCROLL_OFFSET}
              duration={500}
              className="w-full cursor-pointer rounded-lg border-2 border-[#06b6d4] px-8 py-3.5 text-center text-sm font-semibold text-[#06b6d4] transition-all hover:bg-[#06b6d4]/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] sm:w-auto"
            >
              {t.hero.btnContact}
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: profile photo placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.45, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="relative h-64 w-64 rounded-full bg-gradient-to-br from-[#06b6d4] via-cyan-500 to-cyan-700 p-[3px] shadow-[0_0_48px_rgba(6,182,212,0.35)] sm:h-72 sm:w-72 lg:h-80 lg:w-80"
            aria-label={t.hero.photoPlaceholder}
          >
            <div className="flex h-full w-full items-center justify-center rounded-full bg-[#141414]">
              <span className="text-sm font-medium text-gray-500">
                {t.hero.photoPlaceholder}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
