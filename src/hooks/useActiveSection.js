import { useEffect, useState } from 'react';

/** Sections tracked by navbar (in page order) */
export const NAV_SECTIONS = [
  'hero',
  'about',
  'services',
  'skills',
  'projects',
  'contact',
];

/**
 * Highlights the navbar link for the section most visible in the viewport.
 */
export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const ratios = new Map();

    const pickActive = () => {
      let bestId = 'hero';
      let bestRatio = -1;

      NAV_SECTIONS.forEach((id) => {
        const ratio = ratios.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      setActiveSection(bestId);
    };

    const observers = NAV_SECTIONS.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios.set(id, entry.intersectionRatio);
          pickActive();
        },
        {
          rootMargin: '-72px 0px -45% 0px',
          threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
        },
      );

      observer.observe(element);
      return observer;
    }).filter(Boolean);

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return activeSection;
}
