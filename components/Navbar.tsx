import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../App';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for floating navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update scrolled state
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section
      const sections = ['home', 'projects', 'certifications', 'about', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }

      // Update scroll progress bar
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* Top Left Logo */}
      <div className="fixed top-6 left-6 md:left-12 z-[60] h-[58px] flex items-center">
        <div
          className="text-3xl font-black tracking-widest bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-[0_0_15px_rgba(80,120,255,0.2)] select-none"
          onClick={() => scrollToSection('home')}
        >
          UB
        </div>
      </div>

      {/* Floating Navbar Container */}
      <div className="fixed top-6 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none">
        
        {/* Soft Ambient Glow Behind Navbar */}
        <div 
          className="absolute h-[62px] w-[95%] max-w-[760px] rounded-full blur-[20px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 -z-10 transition-opacity duration-500" 
          style={{ opacity: isScrolled ? 1 : 0.4 }}
        />

        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between h-[58px] w-[95%] max-w-[760px] px-6 rounded-full border border-white/[0.08] transition-all duration-500 bg-[#0a0a0f]/45 backdrop-blur-[24px] ${
            isScrolled 
              ? 'shadow-[0_0_40px_rgba(80,120,255,0.18)] border-white/[0.12] bg-[#050508]/55' 
              : 'shadow-[0_0_40px_rgba(80,120,255,0.1)]'
          }`}
          style={{
            willChange: 'transform, opacity, box-shadow',
          }}
        >
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Controls & CTA */}
          <div className="flex items-center gap-3">
            {/* Resume Button */}
            <a
              href="/resume.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:border-blue-500/50 bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white transition-all text-[11px] font-semibold uppercase tracking-wider"
            >
              <span>Resume</span>
              <ArrowUpRight size={12} className="opacity-60" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8.5 h-8.5 flex items-center justify-center rounded-full border border-white/[0.08] hover:border-blue-500/50 bg-white/[0.03] hover:bg-white/[0.08] text-white/60 hover:text-white transition-all"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun size={14} /> : <Moon size={14} />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8.5 h-8.5 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Glass Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            {/* Dark Blur Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="absolute right-0 top-0 h-full w-[280px] bg-[#0a0a0f]/80 backdrop-blur-[24px] border-l border-white/[0.08] shadow-2xl pt-28 px-6 flex flex-col justify-between pb-10"
            >
              <div className="space-y-3">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                        : 'text-white/60 hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Drawer Bottom Info */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="h-px bg-white/[0.08]" />
                <a
                  href="/resume.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-white/70 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <span>Download Resume</span>
                  <ArrowUpRight size={14} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;