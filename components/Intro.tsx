import React from 'react';
import { motion } from 'framer-motion';

const Intro: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-sans">
            UB
          </span>
        </h1>
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-4 text-center text-sm tracking-[0.3em] uppercase text-[var(--text-muted)]"
        >
          Design Engineer
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Intro;