import { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useLanguage } from '../hooks/useLanguage';
import { useActiveSection } from '../hooks/useActiveSection';
import { useNavbarScroll } from '../hooks/useNavbarScroll';
import { SCROLL_OFFSET } from '../constants/motion';

const NAV_LINK_KEYS = [
  { key: 'about', to: 'about' },
  { key: 'services', to: 'services' },
  { key: 'skills', to: 'skills' },
  { key: 'projects', to: 'projects' },
  { key: 'contact', to: 'contact' },
];

const scrollProps = {
  smooth: true,
  offset: SCROLL_OFFSET,
  duration: 500,
  spy: false,
};

/** Active link: cyan text + underline */
function navLinkClass(isActive, variant = 'desktop') {
  const base =
    variant === 'desktop'
      ? 'cursor-pointer text-sm font-medium transition-colors hover:text-[#06b6d4]'
      : 'block cursor-pointer rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-cyan-500/10 hover:text-[#06b6d4]';

  const active =
    'text-[#06b6d4] underline decoration-[#06b6d4] decoration-2 underline-offset-[10px]';
  const inactive = variant === 'desktop' ? 'text-gray-300' : 'text-gray-300';

  return `${base} ${isActive ? active : inactive}`;
}

function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold tracking-wide transition-colors hover:bg-cyan-500/10"
      aria-label={
        language === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'
      }
    >
      <span className={language === 'en' ? 'text-[#06b6d4]' : 'text-gray-500'}>
        EN
      </span>
      <span className="text-gray-600" aria-hidden>
        |
      </span>
      <span className={language === 'es' ? 'text-[#06b6d4]' : 'text-gray-500'}>
        ES
      </span>
    </button>
  );
}

export default function Navbar() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const hidden = useNavbarScroll();

  const closeMenu = () => setMenuOpen(false);

  /** Prevent background scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ y: hidden ? '-100%' : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/85 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_1px_24px_rgba(6,182,212,0.25)]"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="hero"
          {...scrollProps}
          className={`shrink-0 cursor-pointer text-2xl font-bold tracking-wider transition-colors hover:text-cyan-300 ${
            activeSection === 'hero'
              ? 'text-[#06b6d4]'
              : 'text-[#06b6d4]'
          }`}
          onClick={closeMenu}
        >
          VAP
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-6 lg:gap-8">
            {NAV_LINK_KEYS.map(({ key, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  {...scrollProps}
                  className={navLinkClass(activeSection === to, 'desktop')}
                >
                  {t.navbar[key]}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>

        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/5 hover:text-[#06b6d4]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-cyan-500/10 bg-[#0a0a0a]/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINK_KEYS.map(({ key, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    {...scrollProps}
                    className={navLinkClass(activeSection === to, 'mobile')}
                    onClick={closeMenu}
                  >
                    {t.navbar[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
