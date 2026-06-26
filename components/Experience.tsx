import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, Award, X, ShieldCheck } from 'lucide-react';
import { useTheme } from '../App';

interface ExperienceItem {
    id: number;
    period: string;
    title: string;
    company: string;
    department?: string;
    description: string[];
    gradient: string;
    glowColor: string;
    icon: React.ReactNode;
    certificateImage: string;
}

const experiences: ExperienceItem[] = [
    {
        id: 1,
        period: "4 Months | Dec 2025 - Mar 2026",
        title: "Intern",
        company: "Aaviza Electronics Pvt Ltd | Ramamurthy Nagar, Bangalore",
        department: "Wiring Harness & Electromechanical Assemblies",
        description: [
            "Gained hands-on experience in wiring harness assembly, cable routing, and electromechanical integration for industrial electronic systems, ensuring compliance with manufacturing and quality standards.",
            "Performed continuity testing, assembly verification, and quality inspections on 100+ assemblies, identifying defects and ensuring adherence to quality and safety standards.",
            "Assisted in assembly and testing of electromechanical systems, ensuring compliance with specifications and standards."
        ],
        gradient: "from-indigo-500/10 to-violet-500/10",
        glowColor: "rgba(99, 102, 241, 0.15)",
        icon: <Briefcase className="w-6 h-6 text-indigo-400" />,
        certificateImage: "/certificates/aaviza_certificate.png"
    },
    {
        id: 2,
        period: "May - Jul 2025",
        title: "IoT Internship",
        company: "APSCHE",
        department: "Council for Skills and Competencies",
        description: [
            "Gained industry exposure in embedded systems and IoT development through APSCHE's skill council."
        ],
        gradient: "from-emerald-500/10 to-teal-500/10",
        glowColor: "rgba(16, 185, 129, 0.15)",
        icon: <Award className="w-6 h-6 text-emerald-400" />,
        certificateImage: "/certificates/apsche_iot.png"
    }
];

const ExperienceCard: React.FC<{ 
    item: ExperienceItem; 
    index: number; 
    onViewCertificate: (item: ExperienceItem) => void;
}> = ({ item, index, onViewCertificate }) => {
    const { isDark } = useTheme();
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, margin: "-80px" });
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        setGlowPos({ x: mouseX, y: mouseY });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -6 }}
            className="relative rounded-[28px] overflow-hidden bg-transparent flex flex-col group p-6 md:p-8 justify-between"
        >
            {/* Radial hover glow */}
            <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                style={{
                    background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, ${item.glowColor}, transparent 80%)`
                }}
            />

            <div>
                {/* Period & Icon Header */}
                <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                        <Calendar className="w-3 h-3" />
                        {item.period}
                    </span>
                    <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {item.icon}
                    </div>
                </div>

                {/* Job Title & Company */}
                <div className="mb-6">
                    <h3 
                        style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                        className="text-2xl font-black uppercase tracking-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
                    >
                        {item.title}
                    </h3>
                    <p className="text-md font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mt-1">
                        {item.company}
                    </p>
                    {item.department && (
                        <p className="text-xs font-semibold text-[var(--text-muted)] mt-1 uppercase tracking-wider">
                            {item.department}
                        </p>
                    )}
                </div>

                {/* Descriptions */}
                <ul className="space-y-3 mb-8">
                    {item.description.map((desc, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                                {desc}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* View Certificate Button */}
            <div className="mt-auto flex justify-start">
                <button
                    onClick={() => onViewCertificate(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-lg text-[11px] font-bold transition-all border border-blue-500/20 shadow-sm"
                >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                </button>
            </div>
        </motion.div>
    );
};

const Experience: React.FC = () => {
    const { isDark } = useTheme();
    const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedItem]);

    return (
        <div className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
            {/* Background radial accent glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Spacious heading section */}
            <div className="mb-24 text-center md:text-left flex flex-col items-center md:items-start">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-600 dark:text-purple-400 mb-4 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    Professional History
                </span>
                <h2 
                    style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                    className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none select-none font-sans"
                >
                    Experience
                </h2>
                <p className="mt-6 text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed font-medium">
                    Hands-on internship roles bridging engineering fundamentals with industrial workflows.
                </p>
            </div>

            {/* Stacked cards with alternating alignment */}
            <div className="flex flex-col gap-12 w-full">
                {experiences.map((item, index) => {
                    const isLeft = index === 0;
                    return (
                        <div 
                            key={item.id}
                            className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                        >
                            <div className="w-full md:w-[65%] lg:w-[55%]">
                                <ExperienceCard 
                                    item={item} 
                                    index={index} 
                                    onViewCertificate={(item) => setSelectedItem(item)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal - Portaled to body */}
            {typeof document !== 'undefined' && selectedItem && createPortal(
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl cursor-zoom-out"
                    onClick={() => setSelectedItem(null)}
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="relative max-w-5xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
                        <button 
                            className="absolute top-5 right-5 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all z-20 group border border-white/10 shadow-lg"
                            onClick={() => setSelectedItem(null)}
                        >
                            <X size={28} />
                        </button>
                        
                        <div className="p-2 md:p-4 bg-gray-100 dark:bg-slate-800">
                            <img 
                                src={selectedItem.certificateImage} 
                                alt={`${selectedItem.company} Certificate`} 
                                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-inner mx-auto"
                            />
                        </div>
                        
                        <div className="p-8 bg-white dark:bg-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    Internship Certificate
                                </h4>
                                <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold mt-1">
                                    {selectedItem.company} — {selectedItem.title}
                                </p>
                            </div>
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:scale-105 transition-transform text-lg shadow-xl"
                            >
                                Close Preview
                            </button>
                        </div>
                    </motion.div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Experience;
