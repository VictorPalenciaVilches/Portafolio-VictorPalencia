import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { VIEWPORT, SECTION_CLASS } from '../constants/motion';
import SectionDivider from './SectionDivider';

/** Normalize URLs that may or may not include https:// */
function ensureUrl(value) {
  if (value.startsWith('http')) return value;
  return `https://${value}`;
}

export default function Contact() {
  const { t } = useLanguage();
  const mailtoLink = `mailto:${t.contact.emailValue}`;
  const githubUrl = t.contact.githubUrl || ensureUrl(t.contact.githubValue);
  const whatsappUrl = t.contact.whatsappUrl;

  return (
    <section id="contact" className={SECTION_CLASS}>
      <SectionDivider />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4]">
            {t.contact.tag}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-base text-gray-300 sm:text-lg">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* Email, GitHub & WhatsApp CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-12 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap"
        >
          <a
            href={mailtoLink}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#06b6d4] px-6 py-4 text-base font-semibold text-[#0a0a0a] transition-all hover:bg-cyan-400 hover:shadow-[0_0_32px_rgba(6,182,212,0.45)] sm:min-w-[10rem] sm:flex-1"
          >
            <FaEnvelope size={20} aria-hidden />
            {t.contact.btnEmail}
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-[#06b6d4] px-6 py-4 text-base font-semibold text-[#06b6d4] transition-all hover:bg-[#06b6d4]/10 hover:shadow-[0_0_28px_rgba(6,182,212,0.3)] sm:min-w-[10rem] sm:flex-1"
          >
            <FaGithub size={22} aria-hidden />
            {t.contact.github}
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-emerald-500/50 bg-emerald-500/10 px-6 py-4 text-base font-semibold text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-[0_0_24px_rgba(16,185,129,0.25)] sm:min-w-[10rem] sm:flex-1"
          >
            <FaWhatsapp size={22} aria-hidden />
            {t.contact.btnWhatsapp}
          </a>
        </motion.div>

        {/* Contact details + social row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-6"
        >
          <div className="flex w-full max-w-2xl flex-col items-center gap-3 text-center text-sm text-gray-300 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
            <span className="break-all sm:break-normal">
              <span className="font-medium text-gray-200">
                {t.contact.email}:
              </span>{' '}
              <a
                href={mailtoLink}
                className="text-[#06b6d4] transition-colors hover:text-cyan-300"
              >
                {t.contact.emailValue}
              </a>
            </span>
            <span className="hidden text-gray-600 sm:inline" aria-hidden>
              |
            </span>
            <span className="break-all sm:break-normal">
              <span className="font-medium text-gray-200">
                {t.contact.github}:
              </span>{' '}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#06b6d4] transition-colors hover:text-cyan-300"
              >
                {t.contact.githubValue}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-500/30 text-[#06b6d4] transition-all hover:border-[#06b6d4] hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
              aria-label="GitHub profile"
            >
              <FaGithub size={22} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 text-emerald-400 transition-all hover:border-emerald-400 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={22} />
            </a>
          </div>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 border-t border-white/5 pt-8 text-center text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} — {t.contact.footer}</p>
        </motion.footer>
      </div>
    </section>
  );
}
