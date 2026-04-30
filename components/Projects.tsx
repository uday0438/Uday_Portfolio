import React, { useRef, MouseEvent, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Cpu, Wifi, Droplets, Eye, Leaf, Sprout, ShoppingBag, X, CheckCircle2, AlertCircle, Lightbulb, FileText } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: React.ReactNode;
  github?: string;
  demo?: string;
  localPresentationPdf?: string;
  details?: {
    challenge: string;
    solution: string;
    results: string[];
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Mini Project: Contactless Attendance",
    description: "Face-recognition based attendance system using ESP32 and HuskyLens AI camera, automatically logging data to Google Sheets.",
    tags: ["ESP-32", "HuskyLens", "Google Sheets API"],
    gradient: "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10",
    icon: <Eye className="w-8 h-8 text-blue-500" />,
    github: "https://github.com/uday0438",
    details: {
      challenge: "Manual attendance marking in classrooms is time-consuming and prone to proxy errors. Traditional biometric systems require physical contact, which is unhygienic.",
      solution: "Developed a contactless system using the HuskyLens AI vision sensor paired with an ESP32. The system recognizes faces in real-time and pushes attendance data directly to a Google Sheet via a custom Apps Script API.",
      results: [
        "Reduced attendance marking time by 70%",
        "Eliminated physical contact requirements",
        "Automated reporting for faculty members",
        "Successful field testing with a 95%+ accuracy rate"
      ]
    }
  },
  {
    id: 9,
    title: "Major Project: Smart Attendance System",
    description: "Advanced facial recognition attendance system utilizing a Raspberry Pi and webcam for robust and scalable deployment.",
    tags: ["Raspberry Pi", "Webcam", "Python", "OpenCV"],
    gradient: "from-indigo-500/20 to-violet-500/20 dark:from-indigo-500/10 dark:to-violet-500/10",
    icon: <Eye className="w-8 h-8 text-indigo-500" />,
    github: "https://github.com/uday0438",
    details: {
      challenge: "Scaling contactless attendance for larger institutions requires higher processing power, better camera resolution, and more robust database management than microcontroller-based solutions can provide.",
      solution: "Engineered a comprehensive attendance solution using a Raspberry Pi paired with a standard webcam. Leveraged OpenCV and Python for accurate facial recognition, enabling faster processing of multiple faces and more complex data handling.",
      results: [
        "Capable of recognizing multiple faces in a single frame",
        "Enhanced image processing capabilities using Python and OpenCV",
        "Robust local database logging before cloud synchronization",
        "Scalable architecture suitable for institutional implementation"
      ]
    }
  },
  {
    id: 2,
    title: "Smart Door Unlocking System",
    description: "IoT-enabled door lock with facial recognition using HuskyLens and Bluetooth connectivity via ESP32.",
    tags: ["ESP-32", "HuskyLens", "Bluetooth"],
    gradient: "from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10",
    icon: <Wifi className="w-8 h-8 text-purple-500" />,
    github: "https://github.com/uday0438",
    details: {
      challenge: "Standard key-based or PIN-based locks are susceptible to unauthorized access and can be inconvenient for users who frequently lose keys.",
      solution: "Implemented a multi-factor authentication lock. It primary uses facial recognition via HuskyLens for primary entry, with a secondary Bluetooth-app override for remote unlocking using ESP32's BLE capabilities.",
      results: [
        "Implemented secure facial storage locally",
        "Created an emergency Bluetooth bypass",
        "Real-time OLED display feedback for user status",
        "High-torque servo integration for secure latching"
      ]
    }
  },
  {
    id: 3,
    title: "Water Level & Leak Alert",
    description: "Real-time water level monitoring with GSM-based SMS alerts using SIM800L module, preventing overflow.",
    tags: ["ESP32", "SIM800L", "Water Sensors"],
    gradient: "from-cyan-500/20 to-teal-500/20 dark:from-cyan-500/10 dark:to-teal-500/10",
    icon: <Droplets className="w-8 h-8 text-cyan-500" />,
    github: "https://github.com/uday0438",
    details: {
      challenge: "Water scarcity and wastage due to overhead tank overflows are major issues in residential areas, often going unnoticed until significant damage occurs.",
      solution: "Built an automated monitoring system using ultrasonic sensors and an ESP32. When water reaches a threshold, it triggers a GSM module to send SMS alerts and automatically shuts off the pump.",
      results: [
        "Prevented 100% of overflow incidents during testing",
        "Remote monitoring via SMS for users without internet",
        "Low power consumption design for battery operation",
        "Instant leak detection via moisture sensors"
      ]
    }
  },
  {
    id: 4,
    title: "Smart Blind Stick",
    description: "Assistive navigation device for visually impaired using ultrasonic sensors and GSM module for emergency SOS.",
    tags: ["ESP32", "GSM Module", "Ultrasonic"],
    gradient: "from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10",
    icon: <Cpu className="w-8 h-8 text-amber-500" />,
    github: "https://github.com/uday0438",
    details: {
      challenge: "Visually impaired individuals face significant risks navigating unfamiliar environments, and emergency assistance is often hard to summon.",
      solution: "Designed an intelligent stick equipped with ultrasonic sensors for obstacle detection with haptic feedback. Added a GPS+GSM system that sends a location link via SMS when an SOS button is pressed.",
      results: [
        "360-degree obstacle detection within 2 meters",
        "Haptic vibration patterns for different distances",
        "One-touch emergency geolocation sharing",
        "Lightweight and durable 3D-printed housing"
      ]
    }
  },
  {
    id: 5,
    title: "ScanGreen",
    description: "AI-Based Sustainability Platform (Frontend Prototype) focused on environmental impact.",
    tags: ["HTML", "CSS", "JavaScript", "AI Tools"],
    gradient: "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10",
    icon: <Sprout className="w-8 h-8 text-emerald-500" />,
    github: "https://github.com/uday0438/Scan-Green",
    demo: "https://scan-green-one.vercel.app/",
    localPresentationPdf: "/Presentation1.pdf",
    details: {
      challenge: "Users lack clear information on the sustainability of everyday products, making Eco-friendly shopping difficult and time-consuming.",
      solution: "Architected a frontend prototype for an item-scanning app that calculates environmental impact scores based on materials, carbon footprint, and recyclability.",
      results: [
        "Responsive glassmorphic UI design",
        "Simulated AI scanning experience",
        "Educational 'Green Tips' database integration",
        "High-fidelity prototype for investor pitches"
      ]
    }
  },
  {
    id: 7,
    title: "SilkArt",
    description: "Static E-commerce Website showcasing traditional craftsmanship with modern UI.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-pink-500/20 to-rose-500/20 dark:from-pink-500/10 dark:to-rose-500/10",
    icon: <ShoppingBag className="w-8 h-8 text-pink-500" />,
    details: {
      challenge: "Local traditional silk artisans lack a digital presence to compete with large automated e-commerce platforms.",
      solution: "Created a visually stunning, lightweight static website that focuses on the 'story' of the silk, using high-resolution imagery and elegant typography.",
      results: [
        "Optimized for 100/100 Lighthouse performance",
        "SEO-friendly semantic HTML structure",
        "Custom image gallery with smooth transitions",
        "Fully responsive layout for mobile shoppers"
      ]
    }
  },
  {
    id: 8,
    title: "CSP Project - Fruit Safety",
    description: "Community awareness project on the use of chemicals on fruits and vegetables, conducting detailed impact analysis.",
    tags: ["Community Awareness", "Field Study", "Research"],
    gradient: "from-blue-600/20 to-green-600/20 dark:from-blue-600/10 dark:to-green-600/10",
    icon: <Leaf className="w-8 h-8 text-green-500" />,
    details: {
      challenge: "Lack of awareness in the community regarding the harmful effects of chemical ripening and pesticides on common fruits and vegetables.",
      solution: "Conducted field visits and awareness activities, educating local vendors and consumers about organic alternatives and safe washing techniques.",
      results: [
        "Surveyed 50+ local households and vendors",
        "Distributed safety guidelines for chemical-free produce",
        "Documented impact of ripening agents on health",
        "Recommended best practices for vegetable sanitation"
      ]
    }
  }
];

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] bg-[var(--bg-secondary)] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-[var(--border-color)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-6 md:p-8 bg-gradient-to-br ${project.gradient} border-b border-[var(--border-color)] flex justify-between items-start`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center shadow-sm">
              {project.icon}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">{project.title}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold px-2 py-1 rounded-md bg-[var(--bg-secondary)]/50 backdrop-blur-sm border border-[var(--border-color)] text-[var(--text-secondary)]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-red-500 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10">
          {project.details ? (
            <>
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider text-sm">
                  <AlertCircle size={18} /> The Challenge
                </div>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed italic border-l-4 border-amber-500/30 pl-6">
                  "{project.details.challenge}"
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-blue-500 font-bold uppercase tracking-wider text-sm">
                  <Lightbulb size={18} /> The Solution
                </div>
                <p className="text-[var(--text-primary)] text-lg leading-relaxed">
                  {project.details.solution}
                </p>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-green-500 font-bold uppercase tracking-wider text-sm">
                  <CheckCircle2 size={18} /> Key Results
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.details.results.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-start gap-3"
                    >
                      <div className="mt-1 text-green-500 flex-shrink-0">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-sm text-[var(--text-secondary)] font-medium">{result}</span>
                    </motion.div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <p className="text-[var(--text-secondary)] text-lg italic text-center py-10">
              Detailed case study coming soon for this project.
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)] flex flex-wrap justify-end gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xl text-[var(--text-primary)] hover:border-blue-500 transition-all font-semibold shadow-sm"
            >
              <Github size={24} /> View Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 text-xl text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all font-semibold shadow-sm"
            >
              <ExternalLink size={24} /> Live Demo
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="perspective-1000"
      onClick={onClick}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className={`relative h-full min-h-[360px] w-full rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br ${project.gradient} border border-[var(--border-color)] shadow-sm hover:shadow-2xl transition-all duration-500`}
      >
        <div
          style={{ transform: "translateZ(50px)" }}
          className="relative flex flex-col p-8 h-full z-10"
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-300"
            style={{ transform: "translateZ(30px)" }}>
            {project.icon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:text-blue-500 transition-colors duration-300"
            style={{ transform: "translateZ(25px)" }}>
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 flex-1"
            style={{ transform: "translateZ(20px)" }}>
            {project.description}
          </p>

          {/* Footer Card */}
          <div className="flex justify-between items-center mt-auto" style={{ transform: "translateZ(15px)" }}>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} className="bg-[var(--bg-secondary)]/80 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-[var(--text-secondary)] border border-[var(--border-color)] tracking-wide">
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="text-[10px] text-[var(--text-muted)] mt-0.5">+{project.tags.length - 2} more</span>
              )}
            </div>
            
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" title="View Code" className="w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-blue-500 hover:text-white transition-all shadow-md">
                  <Github size={20} />
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" title="Live Demo" className="w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-blue-500 hover:text-white transition-all shadow-md">
                  <ExternalLink size={20} />
                </a>
              )}
              {(!project.github && !project.demo) && (
                <div className="w-11 h-11 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] group-hover:bg-blue-500 group-hover:text-white transition-all pointer-events-none shadow-md">
                  <ExternalLink size={20} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Overlay Glow */}
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16 md:flex justify-between items-end"
      >
        <div>
          <h2 className="text-4xl font-bold text-[var(--text-primary)]">Featured Projects</h2>
          <p className="mt-3 text-[var(--text-secondary)] max-w-lg">
            A collection of IoT, VLSI, and Engineering solutions designed to bridge the gap between hardware and software.
          </p>
        </div>
        <div className="hidden md:block text-sm font-medium text-[var(--text-muted)] italic">
          Click any card to read the full case study
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => {
              if (project.localPresentationPdf) {
                window.open(project.localPresentationPdf, '_blank');
              } else {
                setSelectedProject(project);
              }
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;