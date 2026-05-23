import React, { useState, useEffect, createContext, useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import About from './components/About';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import SpaceBackground from './components/SpaceBackground';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleTheme = () => {
    setIsDark((prev: boolean) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={`min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-cyan-200/30 selection:text-cyan-900 dark:selection:text-cyan-100 relative overflow-hidden`}>
        <SpaceBackground />
        <AnimatePresence>
          {showIntro && <Intro />}
        </AnimatePresence>

        <Navbar />
        
        <main className={showIntro ? 'opacity-0' : 'animate-fade-in-up relative z-10'}>
          <section id="home">
            <Hero />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="certifications">
            <Certifications />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="experience">
            <Timeline />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;