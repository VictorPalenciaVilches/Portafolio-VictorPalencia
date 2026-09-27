import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 10;

/**
 * Hides navbar when scrolling down, shows when scrolling up.
 * Always visible near the top of the page.
 */
export function useNavbarScroll() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastScrollY + SCROLL_THRESHOLD) {
        setHidden(true);
      } else if (currentY < lastScrollY - SCROLL_THRESHOLD) {
        setHidden(false);
      }

      lastScrollY = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return hidden;
}
