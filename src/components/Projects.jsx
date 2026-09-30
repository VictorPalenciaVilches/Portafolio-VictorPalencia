import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useLanguage } from '../hooks/useLanguage';
import { VIEWPORT, SECTION_CLASS } from '../constants/motion';
import SectionDivider from './SectionDivider';
import prestamosImg from '../assets/projects/prestamos.png';
import urbangymImg from '../assets/projects/urbangym.png';
import hotelImg from '../assets/projects/hotel.png';
import graneroImg from '../assets/projects/granero.png';

const PROJECT_IMAGES_BY_TITLE = {
  'PréstamosFácil': [prestamosImg],
  UrbanGYM: [urbangymImg],
  'Hotel Cacique T': [hotelImg],
  'Gestión Granero': [graneroImg],
};

const SLIDE_INTERVAL_MS = 3000;

function ProjectImageSlider({ images, title }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setCurrentSlide(0);
  }, [images]);

  useEffect(() => {
    if (!hasMultiple) return undefined;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [hasMultiple, images.length]);

  if (images.length === 0) {
    return (
      <div className="flex h-[220px] items-center justify-center rounded-t-xl bg-[#1a1a1a] text-sm text-gray-500">
        —
      </div>
    );
  }

  return (
    <div className="relative h-[220px] overflow-hidden rounded-t-xl bg-[#1a1a1a]">
      <img
        src={images[currentSlide]}
        alt={title}
        className="h-full w-full object-cover"
      />

      {hasMultiple && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-4 bg-[#06b6d4]'
                  : 'w-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, labels, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#1e1e1e] bg-[#111] transition-all duration-300 hover:scale-[1.02] hover:border-[#06b6d4]/50 hover:shadow-[0_0_28px_rgba(6,182,212,0.2)]"
    >
      <ProjectImageSlider images={project.images} title={project.title} />

      <div className="flex flex-grow flex-col p-5 sm:p-6">
        <h3 className="text-xl font-bold text-white sm:text-2xl">
          {project.title}
        </h3>

        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-[#06b6d4]/15 px-2.5 py-1 text-xs font-medium text-[#06b6d4]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <p className="mt-4 flex-grow text-sm leading-relaxed text-gray-400">
          {project.desc}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {project.isPrivateRepo ? (
            <span className="inline-flex items-center rounded-full border border-[#333] bg-[#1e1e1e] px-3 py-1.5 text-xs font-semibold text-[#888]">
              {labels.privateRepo}
            </span>
          ) : (
            project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:border-[#06b6d4]/40 hover:bg-[#06b6d4]/10 hover:text-white"
              >
                <FaGithub size={16} aria-hidden />
                {labels.sourceCode}
              </a>
            )
          )}

          {project.inProduction === true && (
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
              {labels.inProduction}
            </span>
          )}
          {project.inProduction === false && (
            <span className="inline-flex items-center rounded-full border border-gray-500/30 bg-gray-500/10 px-3 py-1.5 text-xs font-semibold text-gray-400">
              {labels.inDevelopment}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const labels = {
    sourceCode: t.projects.sourceCode,
    privateRepo: t.projects.privateRepo,
    inProduction: t.projects.inProduction,
    inDevelopment: t.projects.inDevelopment,
  };

  const projectsWithImages = t.projects.items.map((project) => ({
    ...project,
    images: PROJECT_IMAGES_BY_TITLE[project.title] ?? [],
  }));

  return (
    <section id="projects" className={SECTION_CLASS}>
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
            {t.projects.tag}
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {t.projects.title}
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projectsWithImages.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              labels={labels}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
