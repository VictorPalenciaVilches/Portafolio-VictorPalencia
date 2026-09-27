import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DISPLAY_MS = 1500;
const FADE_MS = 500;

export default function PageLoader({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setExiting(true), DISPLAY_MS);
    const doneTimer = setTimeout(
      () => onComplete?.(),
      DISPLAY_MS + FADE_MS,
    );

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: FADE_MS / 1000, ease: 'easeInOut' }}
      aria-hidden={exiting}
      aria-label="Loading portfolio"
    >
      <motion.span
        className="text-5xl font-bold tracking-[0.35em] text-[#06b6d4] sm:text-6xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        VAP
      </motion.span>
    </motion.div>
  );
}
