import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const roles = [
  "IoT & Embedded Systems Engineer",
  "VLSI Design Enthusiast",
  "Circuit Design Expert",
  "Hardware Architect",
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center"
      >
        <h1 className="font-serif text-[8vw] md:text-[10vw] leading-none text-[var(--text-primary)] italic select-none">
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

      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl mt-12 px-4 md:px-0 gap-8">
        <motion.div
          className="flex-1 max-w-sm"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed uppercase tracking-wide font-medium">
            An <span className="text-[var(--text-primary)] font-bold">ECE student</span> turning complex problems into clear, impactful engineering solutions.
          </p>
        </motion.div>

        <motion.div
          className="flex-1 max-w-sm md:text-right"
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