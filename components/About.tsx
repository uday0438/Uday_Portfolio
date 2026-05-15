import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Cpu, Code2, PenTool, Database, Laptop, Radio } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-50px" });

  const technicalSkills = ['Digital Electronics', 'VLSI Design', 'Soldering', 'Embedded Systems', 'PCB Design', 'Arduino', 'Circuit Design', 'IoT Systems', 'Microcontrollers (ESP32, 8051)'];
  const programmingLangs = ['Python', 'C', 'HTML/CSS', 'JavaScript'];
  const softwareTools = ['Keil uVision', 'MATLAB', 'Proteus', 'OrCAD', 'MultiSim', 'VS Code', 'Arduino IDE'];

  const SkillChip: React.FC<{ skill: string; delay: number; variant?: 'default' | 'accent' | 'outline' }> = ({ skill, delay, variant = 'default' }) => {
    const baseClasses = "px-5 py-2.5 rounded-xl text-sm font-semibold cursor-default transition-all duration-300";
    const variantClasses = {
      default: "bg-[var(--chip-bg)] text-[var(--chip-text)] hover:shadow-md hover:shadow-blue-500/10 dark:hover:shadow-blue-900/20 border border-transparent hover:border-blue-400/30",
      accent: "bg-blue-50 text-blue-700 dark:bg-blue-900/10 dark:text-blue-300 border border-blue-100 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/20",
      outline: "bg-white dark:bg-[#1e293b] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-purple-400/50 hover:text-purple-600 dark:hover:text-purple-400",
    };

    return (
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={skillsInView ? { opacity: 1, y: 0 } : {}}
        whileHover={{ scale: 1.05, y: -2 }}
        transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
        className={`${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]}`}
      >
        {skill}
      </motion.span>
    );
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto bg-[var(--bg-secondary)] rounded-3xl my-12 shadow-sm border border-[var(--border-color)] relative overflow-hidden"
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
          <h2 className="text-4xl font-bold font-serif text-[var(--text-primary)]">About Me</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-center md:items-start text-center md:text-left">
          <div className="w-56 h-56 md:w-80 md:h-80 flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2.5rem] rotate-6 transform transition-transform group-hover:rotate-8 opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2.5rem] -rotate-3 transform transition-transform group-hover:-rotate-6 opacity-10"></div>
              <img
                src="/profile.jpg"
                alt="Uday"
                className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem] shadow-xl border-4 border-[var(--bg-secondary)]"
              />
          </div>

          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-medium">
                I am a results-driven <span className="text-[var(--text-primary)] font-bold decoration-blue-500/30 underline decoration-4 underline-offset-4">Electronics & Communication Engineering</span> student with a passion for building innovative solutions at the intersection of hardware and software.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Currently pursuing my B.Tech at <span className="font-semibold text-[var(--text-primary)]">Kuppam Engineering College</span> (GPA: 7.6), I specialize in <span className="font-semibold text-[var(--text-primary)]">IoT Systems, VLSI Design, and Embedded Engineering</span>. I am dedicated to developing creative, scalable solutions that solve real-world challenges through technical innovation and disciplined leadership.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] group hover:border-blue-400/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                  <Cpu size={20} />
                </div>
                <h4 className="font-bold text-[var(--text-primary)]">Hardware Design</h4>
                <p className="text-sm text-[var(--text-muted)] mt-1">Specializing in VLSI, PCB Layout, and Circuit Optimization.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] group hover:border-purple-400/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-110 transition-transform">
                  <Radio size={20} />
                </div>
                <h4 className="font-bold text-[var(--text-primary)]">IoT Solutions</h4>
                <p className="text-sm text-[var(--text-muted)] mt-1">End-to-end connected systems with real-time data integration.</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={skillsRef} className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-blue-500 font-bold border-b border-[var(--border-color)] pb-3">
              <Laptop size={20} />
              <h3 className="text-lg uppercase tracking-wider">Engineering Core</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {technicalSkills.map((skill, idx) => (
                <SkillChip key={skill} skill={skill} delay={idx * 0.05} variant="accent" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-500 font-bold border-b border-[var(--border-color)] pb-3">
              <Code2 size={20} />
              <h3 className="text-lg uppercase tracking-wider">Programming</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {programmingLangs.map((lang, idx) => (
                <SkillChip key={lang} skill={lang} delay={idx * 0.05 + 0.3} variant="default" />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-purple-500 font-bold border-b border-[var(--border-color)] pb-3">
              <PenTool size={20} />
              <h3 className="text-lg uppercase tracking-wider">Design Tools</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softwareTools.map((tool, idx) => (
                <SkillChip key={tool} skill={tool} delay={idx * 0.05 + 0.6} variant="outline" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;