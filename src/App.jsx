import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Contact from './components/Contact';

function AppContent() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Stats />
      <Contact />
      <ScrollToTop />
    </main>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <LanguageProvider>
      {/* Content always mounts — loader is an overlay, avoids blank white screen */}
      <AppContent />
      {!ready && <PageLoader onComplete={() => setReady(true)} />}
    </LanguageProvider>
  );
}
