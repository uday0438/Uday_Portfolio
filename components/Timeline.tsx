import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Lightbulb, X } from 'lucide-react';

interface TimelineItem {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    certificateImage?: string;
}

const timelineData: TimelineItem[] = [
    {
        year: "2020",
        title: "Secondary School Certificate (SSC)",
        subtitle: "B.S.R Mpl High school, Dharmavaram — GPA: 7.7",
        description: "Completed secondary education with a strong foundation in science and mathematics.",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "from-gray-500 to-slate-600",
        certificateImage: "/certificates/ssc_certificate.jpg",
    },
    {
        year: "2022",
        title: "Intermediate (XII)",
        subtitle: "Government junior college, Dharmavaram — GPA: 59%",
        description: "Higher secondary education with a focus on Mathematics, Physics, and Chemistry.",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "from-slate-500 to-gray-600",
        certificateImage: "/certificates/intermediate_certificate.jpg",
    },
    {
        year: "2022-26",
        title: "B.Tech in ECE",
        subtitle: "Kuppam Engineering College — GPA: 7.6",
        description: "Pursuing Electronics and Communication Engineering with a focus on digital electronics, VLSI design, and embedded systems.",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "from-blue-500 to-blue-600",
    },
    {
        year: "2024",
        title: "IoT Internship — APSCHE",
        subtitle: "Council for Skills and Competencies",
        description: "Gained industry exposure in embedded systems and IoT development through APSCHE's skill council.",
        icon: <Briefcase className="w-5 h-5" />,
        color: "from-green-500 to-emerald-500",
        certificateImage: "/certificates/apsche_iot.png",
    },
    {
        year: "2025-26",
        title: "Intern — Wiring Harness & Assemblies",
        subtitle: "Aaviza Electronics Pvt. Ltd. (Dec 2025 - Mar 2026)",
        description: "Trained in electrical & electronics concepts, working on wiring harness assembly and testing following quality and safety standards.",
        icon: <Briefcase className="w-5 h-5" />,
        color: "from-indigo-500 to-violet-500",
        certificateImage: "/certificates/aaviza_certificate.png",
    }
];

const TimelineCard: React.FC<{ 
    item: TimelineItem; 
    index: number; 
    isLeft: boolean;
    onImageClick: (item: TimelineItem) => void;
}> = ({ item, index, isLeft, onImageClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`flex items-center gap-6 md:gap-10 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
        >
            {/* Content card */}
            <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.color} mb-3`}>
                        {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm font-medium text-blue-500 dark:text-blue-400 mt-1">{item.subtitle}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{item.description}</p>
                    
                    {item.certificateImage && (
                        <div className="mt-4 flex items-center">
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onImageClick(item);
                                }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white rounded-lg text-xs font-bold transition-all border border-blue-500/20 shadow-sm"
                            >
                                <span>View Certificate</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Timeline node */}
            <div className="flex-shrink-0 relative">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg z-10 relative`}
                >
                    {item.icon}
                </motion.div>
            </div>

            {/* Spacer for alternating layout on desktop */}
            <div className="hidden md:block flex-1" />
        </motion.div>
    );
};

const Timeline: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true });
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

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
        <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-4xl font-bold text-[var(--text-primary)]">Experience & Journey</h2>
                <p className="mt-3 text-[var(--text-secondary)] max-w-lg">
                    My path from student to aspiring design engineer.
                </p>
            </motion.div>

            {/* Timeline line */}
            <div className="relative">
                {/* Vertical line — centered on the nodes */}
                <div className="absolute left-[calc(100%-1.5rem)] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-cyan-500/30 -translate-x-1/2" />

                <div className="space-y-12">
                    {timelineData.map((item, index) => (
                        <TimelineCard
                            key={index}
                            item={item}
                            index={index}
                            isLeft={index % 2 === 0}
                            onImageClick={(item) => setSelectedItem(item)}
                        />
                    ))}
                </div>
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
                                alt="Certificate" 
                                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-inner"
                            />
                        </div>
                        
                        <div className="p-8 bg-white dark:bg-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {selectedItem.title.includes('SSC') ? 'SSC Certificate' : 
                                     selectedItem.title.includes('Intermediate') ? 'Intermediate Certificate' : 
                                     'Internship Certificate'}
                                </h4>
                                <p className="text-lg text-blue-500 dark:text-blue-400 font-semibold mt-1">{selectedItem.subtitle}</p>
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

export default Timeline;
