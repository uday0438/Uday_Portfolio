import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const roles = [
  "IoT & Embedded Systems Engineer",
  "VLSI Design Enthusiast",
  "Circuit Design Expert",
  "Hardware Architect",
  "Vibe Coder",
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev: number) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText((prev: string) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 relative pt-24 md:pt-28 lg:pt-32 w-full max-w-[1400px] mx-auto">
      {/* Introduction Tag - Left aligned on desktop, centered above name on mobile */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="md:absolute md:left-6 lg:left-12 md:top-[23%] md:-translate-y-1/2 flex items-center gap-2 mb-6 md:mb-0 select-none"
      >
        <span className="w-3 md:w-3.5 h-3 md:h-3.5 bg-[#FF4B3A] rounded-[4px] shadow-[0_0_10px_rgba(255,75,58,0.6)] animate-pulse" />
        <span className="text-base md:text-xl font-medium text-[var(--text-secondary)] tracking-wide select-none">
          Hey there I am,
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center"
      >
        <h1 className="font-serif text-[12.65vw] md:text-[15.84vw] leading-none text-[var(--text-primary)] italic select-none">
          Uday
        </h1>
      </motion.div>

      {/* Typing animation subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-4 h-8 flex items-center justify-center"
      >
        <span className="text-lg md:text-xl font-medium text-[var(--text-secondary)]">
          {displayText}
        </span>
        <span className="typing-cursor ml-0.5 text-blue-500">&nbsp;</span>
      </motion.div>

      {/* Midsection (Beside image layout on desktop, stacked on mobile) */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] mt-8 md:mt-4 px-4 md:px-0 gap-6 lg:gap-12 select-none">
        {/* Left Column Description */}
        <motion.div
          className="flex-1 max-w-xs text-center md:text-left order-2 md:order-1 md:translate-y-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed uppercase tracking-wide font-medium">
            An <span className="text-[var(--text-primary)] font-bold">ECE graduate</span> turning complex problems into clear, impactful engineering solutions.
          </p>
        </motion.div>

        {/* Center Column Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="max-w-[390px] md:max-w-[440px] lg:max-w-[480px] w-full px-4 order-1 md:order-2 flex justify-center animate-fade-in md:translate-y-6"
        >
          <img 
            src="/working-illustration-color.png" 
            alt="Uday Bunny working illustration" 
            className="w-full h-auto object-contain select-none drop-shadow-[0_15px_35px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_15px_35px_rgba(255,255,255,0.015)]"
          />
        </motion.div>

        {/* Right Column Description */}
        <motion.div
          className="flex-1 max-w-xs text-center md:text-right order-3 md:translate-y-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed uppercase tracking-wide font-medium">
            Passionate about creating innovative and efficient <span className="text-[var(--text-primary)] font-bold">IoT & VLSI</span> experiences.
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 cursor-pointer text-[var(--text-muted)]"
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ChevronDown size={28} />
      </motion.div>
    </div>
  );
};

export default Hero;