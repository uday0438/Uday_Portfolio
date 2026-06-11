import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Wifi, Cpu, Code, X } from 'lucide-react';
import { useTheme } from '../App';

interface Certification {
    title: string;
    issuer: string;
    icon: React.ReactNode;
    color: string;
    image?: string;
    date?: string;
}

const certifications: Certification[] = [
    { title: "Computer Architecture", issuer: "NPTEL", icon: <Cpu className="w-5 h-5" />, color: "text-blue-500", image: "/certificates/nptel_computer_architecture.jpg", date: "Jul-Oct 2024" },
    { title: "VLSI Design", issuer: "Internshala", icon: <Cpu className="w-5 h-5" />, color: "text-purple-500", image: "/certificates/internshala_vlsi.jpg", date: "Sep 2025" },
    { title: "Getting Started with AI on Jetson Nano", issuer: "Nvidia", icon: <BookOpen className="w-5 h-5" />, color: "text-cyan-500", image: "/certificates/nvidia_ai.jpg", date: "Oct 2025" },
    { title: "Matlab Onramp", issuer: "Mathworks", icon: <Code className="w-5 h-5" />, color: "text-orange-500", image: "/certificates/matlab_onramp.jpg", date: "Jul 2024" },
    { title: "Introduction to Internet of Things", issuer: "NPTEL", icon: <Wifi className="w-5 h-5" />, color: "text-teal-500", image: "/certificates/nptel_iot.png", date: "Jul-Oct 2025" },
    { title: "Quantum Fundamentals", issuer: "WISER / Qubitech", icon: <Cpu className="w-5 h-5" />, color: "text-blue-400", image: "/certificates/quantum_fundamentals.jpg", date: "2025-2026" },
];

const Certifications: React.FC = () => {
    const { isDark } = useTheme();
    const headerRef = useRef<HTMLDivElement>(null);
    const certsRef = useRef<HTMLDivElement>(null);
    const isCertsInView = useInView(certsRef, { once: true, margin: "-50px" });

    const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);

    // Prevent scrolling when certificate image preview modal is open
    useEffect(() => {
        if (selectedCertImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedCertImage]);

    return (
        <div className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
            <div ref={headerRef} className="mb-24 text-center md:text-left flex flex-col items-center md:items-start">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-purple-600 dark:text-purple-400 mb-4 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                    Credentials & Badges
                </span>
                <h2 
                    style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                    className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none select-none font-sans"
                >
                    Certificates
                </h2>
                <p className="mt-6 text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed font-medium">
                    Continuous learning and skill development through industry-recognized certifications and technical training programs.
                </p>
            </div>

            {/* Certifications Grid */}
            <div ref={certsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.05, duration: 0.5 }}
                        onClick={() => cert.image && setSelectedCertImage(cert.image)}
                        className={`flex items-start gap-4 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:shadow-md transition-all duration-300 group ${cert.image ? 'cursor-pointer hover:border-blue-400' : ''}`}
                    >
                        <div className={`mt-0.5 ${cert.color} group-hover:scale-110 transition-transform flex-shrink-0`}>
                            <Award className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2 flex-wrap">
                                {cert.title}
                                {cert.image && <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full flex-shrink-0">View</span>}
                            </h4>
                            <div className="flex items-center justify-between gap-4 mt-2 text-xs font-semibold text-[var(--text-muted)]">
                                <span>{cert.issuer}</span>
                                {cert.date && <span className="bg-blue-500/5 text-blue-500 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-500/10 text-[9px] uppercase tracking-wider flex-shrink-0">{cert.date}</span>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certificate Image Preview Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedCertImage && (
                        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedCertImage(null)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative max-w-5xl max-h-[90vh] z-10"
                            >
                                <button
                                    onClick={() => setSelectedCertImage(null)}
                                    className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors"
                                >
                                    <X size={32} />
                                </button>
                                <img
                                    src={selectedCertImage}
                                    alt="Certificate Preview"
                                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                                />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Certifications;
