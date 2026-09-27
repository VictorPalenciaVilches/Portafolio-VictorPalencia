/**
 * Centralized copy for all supported locales.
 * Default locale: Spanish (es).
 */

/** Shared project copy — resolved per locale via buildProjects() */
const PROJECTS_SOURCE = {
  tag: { es: 'Proyectos', en: 'Projects' },
  title: {
    es: 'Sistemas reales construidos para clientes reales',
    en: 'Real systems built for real clients',
  },
  inProduction: { es: 'En producción', en: 'Live in production' },
  inDevelopment: { es: 'En desarrollo', en: 'In development' },
  sourceCode: { es: 'Ver código', en: 'Source code' },
  privateRepo: {
    es: '🔒 Repositorio privado',
    en: '🔒 Private repository',
  },
  items: [
    {
      title: 'PréstamosFácil',
      desc: {
        es: 'Sistema web completo para gestión de préstamos, cobradores, clientes y abonos. Frontend PWA con React + Vite, backend Node.js + Express y base de datos PostgreSQL en Supabase. En producción con usuarios reales.',
        en: 'Complete web system for managing loans, collectors, clients and payments. PWA frontend with React + Vite, Node.js + Express backend and PostgreSQL on Supabase. In production with real users.',
      },
      tech: ['React', 'Vite', 'Node.js', 'Express', 'Supabase', 'PostgreSQL'],
      github: null,
      isPrivateRepo: true,
      images: ['prestamos.png'],
      inProduction: true,
    },
    {
      title: 'UrbanGYM',
      desc: {
        es: 'Sistema de gestión de gimnasios con arquitectura de microservicios. Gestión de socios, reservas, pagos con MercadoPago, IoT, motor de recomendaciones y panel admin con métricas en tiempo real.',
        en: 'Gym management system with microservices architecture. Member management, bookings, MercadoPago payments, IoT, recommendation engine and admin panel with real-time metrics.',
      },
      tech: ['React', 'NestJS', 'TypeScript', 'Supabase', 'Redis', 'Docker'],
      github: null,
      isPrivateRepo: true,
      images: ['urbangym.png'],
      inProduction: true,
    },
    {
      title: 'Hotel Cacique T',
      desc: {
        es: 'Landing page elegante para hotel de 4 estrellas en Cereté, Córdoba. Diseño bilingüe ES/EN, galería de habitaciones, servicios, eventos y sistema de reservas.',
        en: 'Elegant landing page for a 4-star hotel in Cereté, Córdoba. Bilingual ES/EN design, room gallery, services, events and booking system.',
      },
      tech: ['React', 'Vite', 'Tailwind CSS'],
      github: 'https://github.com/VictorPalenciaVilches',
      isPrivateRepo: false,
      images: ['hotel.png'],
      inProduction: false,
    },
    {
      title: 'Gestión Granero',
      desc: {
        es: 'Sistema web de gestión para graneros y tiendas. Control de inventario, clientes, fiados, ventas y reportes. Dashboard completo con métricas en tiempo real.',
        en: 'Web management system for grain stores and shops. Inventory control, clients, credit sales and reports. Complete dashboard with real-time metrics.',
      },
      tech: ['React', 'Node.js', 'Supabase', 'Tailwind CSS'],
      github: null,
      isPrivateRepo: true,
      images: ['granero.png'],
      inProduction: true,
    },
  ],
};

function buildProjects(lang) {
  return {
    tag: PROJECTS_SOURCE.tag[lang],
    title: PROJECTS_SOURCE.title[lang],
    inProduction: PROJECTS_SOURCE.inProduction[lang],
    inDevelopment: PROJECTS_SOURCE.inDevelopment[lang],
    sourceCode: PROJECTS_SOURCE.sourceCode[lang],
    privateRepo: PROJECTS_SOURCE.privateRepo[lang],
    items: PROJECTS_SOURCE.items.map((item) => ({
      title: item.title,
      desc: item.desc[lang],
      tech: item.tech,
      github: item.github,
      isPrivateRepo: item.isPrivateRepo ?? false,
      images: item.images,
      inProduction: item.inProduction,
    })),
  };
}

const translations = {
  es: {
    navbar: {
      about: 'Sobre mí',
      services: 'Servicios',
      skills: 'Habilidades',
      projects: 'Proyectos',
      contact: 'Contacto',
    },
    hero: {
      available: 'Disponible para trabajo remoto',
      greeting: 'Hola, soy Victor Alejandro',
      role: 'Desarrollador Fullstack',
      description:
        'Desarrollador Fullstack apasionado por construir soluciones reales — desde sistemas financieros hasta herramientas de negocio — impulsado por código limpio y tecnología moderna.',
      btnWork: 'Ver mi trabajo',
      btnContact: 'Contáctame',
      photoPlaceholder: 'Foto próximamente',
    },
    about: {
      tag: 'Sobre mí',
      title: 'Apasionado por construir soluciones que importan',
      p1: 'Soy Victor Alejandro Palencia Vilches, Desarrollador Fullstack y estudiante de Ingeniería de Sistemas en octavo semestre. Construyo aplicaciones web completas — desde la base de datos hasta la interfaz de usuario.',
      p2: 'He entregado sistemas reales en producción usados por clientes activos, incluyendo plataformas de préstamos e inventarios para negocios. Combino fundamentos sólidos de programación con herramientas modernas de IA para entregar resultados más rápidos y de mejor calidad.',
      location: '📍 Montería, Colombia',
      available: '✅ Disponible para trabajo remoto',
    },
    services: {
      tag: 'Servicios',
      title: 'Qué puedo construir para ti',
      items: [
        {
          icon: 'FaCode',
          title: 'Desarrollo Web',
          desc: 'Sitios web y aplicaciones personalizadas con React, modernas y responsivas.',
        },
        {
          icon: 'FaServer',
          title: 'Backend y APIs',
          desc: 'APIs REST, bases de datos y lógica de servidor que impulsan tu aplicación.',
        },
        {
          icon: 'FaBoxes',
          title: 'Sistemas de Negocio',
          desc: 'Sistemas de inventario, plataformas de préstamos y herramientas de gestión a medida.',
        },
        {
          icon: 'FaMobileAlt',
          title: 'Landing Pages',
          desc: 'Landing pages rápidas y atractivas diseñadas para convertir visitantes en clientes.',
        },
      ],
    },
    skills: {
      tag: 'Habilidades',
      title: 'Mi Stack Tecnológico',
      categories: [
        {
          name: 'Frontend',
          skills: [
            'React',
            'Vite',
            'JavaScript',
            'TypeScript',
            'HTML5',
            'CSS3',
            'Tailwind CSS',
          ],
        },
        {
          name: 'Backend',
          skills: ['Node.js', 'Express', 'NestJS', 'PHP', 'Python', 'C++'],
        },
        {
          name: 'Database',
          skills: [
            'MySQL',
            'MongoDB',
            'Supabase',
            'Firebase',
            'PostgreSQL',
            'Redis',
          ],
        },
        {
          name: 'DevOps',
          skills: ['Docker', 'GitHub Actions', 'Vercel', 'Railway'],
        },
        {
          name: 'Tools',
          skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'Postman'],
        },
      ],
    },
    projects: buildProjects('es'),
    stats: {
      tag: 'Estadísticas',
      title: 'Números que hablan',
      items: [
        { number: '3+', label: 'Clientes Activos' },
        { number: '4+', label: 'Proyectos Entregados' },
        { number: '2+', label: 'Años de Experiencia' },
        { number: '8vo', label: 'Semestre de Ingeniería' },
      ],
    },
    contact: {
      tag: 'Contacto',
      title: 'Trabajemos juntos',
      subtitle: '¿Tienes un proyecto en mente? Hablemos.',
      email: 'Email',
      github: 'GitHub',
      whatsapp: 'WhatsApp',
      emailValue: 'palenciavilchesvictoralejandro@gmail.com',
      githubValue: 'github.com/VictorPalenciaVilches',
      githubUrl: 'https://github.com/VictorPalenciaVilches',
      whatsappUrl: 'https://wa.me/573052890338',
      btnEmail: 'Enviar Correo',
      btnWhatsapp: 'WhatsApp',
      footer: 'Diseñado y construido por Victor Alejandro Palencia Vilches',
    },
  },
  en: {
    navbar: {
      about: 'About',
      services: 'Services',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      available: 'Available for remote work',
      greeting: "Hi, I'm Victor Alejandro",
      role: 'Fullstack Developer',
      description:
        'Fullstack developer passionate about building real-world solutions — from financial systems to business tools — powered by clean code and modern technology.',
      btnWork: 'View My Work',
      btnContact: 'Contact Me',
      photoPlaceholder: 'Photo coming soon',
    },
    about: {
      tag: 'About Me',
      title: 'Passionate about building solutions that matter',
      p1: "I'm Victor Alejandro Palencia Vilches, a Fullstack Developer and Systems Engineering student in my 8th semester. I build complete web applications — from the database to the user interface.",
      p2: "I've delivered real production systems currently used by active clients, including loan management platforms and inventory systems for businesses. I combine solid programming fundamentals with modern AI tools to deliver faster and better results.",
      location: '📍 Montería, Colombia',
      available: '✅ Available for remote work',
    },
    services: {
      tag: 'Services',
      title: 'What I can build for you',
      items: [
        {
          icon: 'FaCode',
          title: 'Web Development',
          desc: 'Custom websites and web apps built with React, modern and responsive.',
        },
        {
          icon: 'FaServer',
          title: 'Backend & APIs',
          desc: 'REST APIs, databases, and server logic that power your application.',
        },
        {
          icon: 'FaBoxes',
          title: 'Business Systems',
          desc: 'Inventory systems, loan platforms, and custom management tools.',
        },
        {
          icon: 'FaMobileAlt',
          title: 'Landing Pages',
          desc: 'Fast, beautiful landing pages designed to convert visitors into clients.',
        },
      ],
    },
    skills: {
      tag: 'Skills',
      title: 'My Tech Stack',
      categories: [
        {
          name: 'Frontend',
          skills: [
            'React',
            'Vite',
            'JavaScript',
            'TypeScript',
            'HTML5',
            'CSS3',
            'Tailwind CSS',
          ],
        },
        {
          name: 'Backend',
          skills: ['Node.js', 'Express', 'NestJS', 'PHP', 'Python', 'C++'],
        },
        {
          name: 'Database',
          skills: [
            'MySQL',
            'MongoDB',
            'Supabase',
            'Firebase',
            'PostgreSQL',
            'Redis',
          ],
        },
        {
          name: 'DevOps',
          skills: ['Docker', 'GitHub Actions', 'Vercel', 'Railway'],
        },
        {
          name: 'Tools',
          skills: ['Git', 'GitHub', 'Figma', 'VS Code', 'Postman'],
        },
      ],
    },
    projects: buildProjects('en'),
    stats: {
      tag: 'Stats',
      title: 'Numbers that speak',
      items: [
        { number: '3+', label: 'Active Clients' },
        { number: '4+', label: 'Projects Delivered' },
        { number: '2+', label: 'Years of Experience' },
        { number: '8th', label: 'Engineering Semester' },
      ],
    },
    contact: {
      tag: 'Contact',
      title: "Let's work together",
      subtitle: "Have a project in mind? Let's talk.",
      email: 'Email',
      github: 'GitHub',
      whatsapp: 'WhatsApp',
      emailValue: 'palenciavilchesvictoralejandro@gmail.com',
      githubValue: 'github.com/VictorPalenciaVilches',
      githubUrl: 'https://github.com/VictorPalenciaVilches',
      whatsappUrl: 'https://wa.me/573052890338',
      btnEmail: 'Send Email',
      btnWhatsapp: 'WhatsApp',
      footer: 'Designed & Built by Victor Alejandro Palencia Vilches',
    },
  },
};

export default translations;
