import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

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
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight relative flex items-center justify-center">
          <motion.div className="relative">
            {/* Graduation Cap - Using SVG icon for perfect transparency and crisp look */}
            <motion.div 
              className="absolute -top-10 -left-10 z-10 -rotate-12 pointer-events-none filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
              initial={{ y: -50, x: -10, rotate: -25, opacity: 0 }}
              animate={{ y: 0, x: 0, rotate: -12, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              <div className="relative">
                <GraduationCap 
                  className="w-16 md:w-24 h-16 md:h-24 text-slate-900 fill-slate-800" 
                  strokeWidth={1}
                />
                {/* Custom Tassel to match your image */}
                <div className="absolute top-[45%] right-[15%] w-1 md:w-1.5 h-6 md:h-10 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full shadow-sm" />
              </div>
            </motion.div>
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-sans px-2">
              UB
            </span>
          </motion.div>
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