import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Trophy, Star, Wifi, Cpu, Code, ChevronLeft, ChevronRight, X, Lightbulb } from 'lucide-react';

interface Certification {
    title: string;
    issuer: string;
    icon: React.ReactNode;
    color: string;
    image?: string;
}

interface AchievementDetails {
    text: string;
    images: string[];
}

interface Achievement {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    details?: AchievementDetails;
}

const certifications: Certification[] = [
    { title: "Computer Architecture", issuer: "NPTEL", icon: <Cpu className="w-5 h-5" />, color: "text-blue-500", image: "/certificates/nptel_computer_architecture.jpg" },
    { title: "MongoDB Basics Certification", issuer: "MongoDB University", icon: <BookOpen className="w-5 h-5" />, color: "text-green-500" },
    { title: "VLSI Design", issuer: "Internshala", icon: <Cpu className="w-5 h-5" />, color: "text-purple-500", image: "/certificates/internshala_vlsi.jpg" },
    { title: "Getting Started with AI on Jetson Nano", issuer: "Nvidia", icon: <BookOpen className="w-5 h-5" />, color: "text-cyan-500", image: "/certificates/nvidia_ai.jpg" },
    { title: "Networking & Storage Essentials", issuer: "EDX", icon: <Wifi className="w-5 h-5" />, color: "text-amber-500", image: "/certificates/edx_networking.jpg" },
    { title: "Matlab Onramp", issuer: "Mathworks", icon: <Code className="w-5 h-5" />, color: "text-orange-500", image: "/certificates/matlab_onramp.jpg" },
    { title: "Introduction to Internet of Things", issuer: "NPTEL", icon: <Wifi className="w-5 h-5" />, color: "text-teal-500", image: "/certificates/nptel_iot.png" },
    { title: "Quantum Fundamentals", issuer: "WISER / Qubitech", icon: <Cpu className="w-5 h-5" />, color: "text-blue-400", image: "/certificates/quantum_fundamentals.jpg" },
];

const achievements: Achievement[] = [
    {
        title: "Smart India Hackathon Winner",
        description: "Won the prestigious national-level hackathon for innovative IoT solution",
        icon: <Trophy className="w-6 h-6" />,
        color: "from-amber-500 to-yellow-500",
        details: {
            text: `Proud to share that our team emerged as the 🏆 Winner of Smart India Hackathon 2025 (Hardware Edition), a prestigious national-level innovation challenge organized by the Ministry of Education, Government of India 🇮🇳.

This achievement reflects months of dedication, hands-on engineering, and collaborative problem-solving to build a practical solution with real-world impact. The journey strengthened my technical skills, teamwork, and innovation mindset.

Thankful to SIH, AICTE, and MoE for providing such an inspiring platform to innovate and contribute to nation-building 🚀.

Team Name: ClassLens📷 😊 
Team ID: 51218
PS ID: SIH25123

/Dream, Build, Achieve`,
            images: [
                "/sih/1.jpg",
                "/sih/2.jpg",
                "/sih/3.jpg",
                "/sih/4.jpg",
                "/sih/5.jpg"
            ]
        }
    },
    {
        title: "1st Prize — Project Expo",
        description: "Nagastra 2026 at Kuppam Engineering College",
        icon: <Trophy className="w-6 h-6" />,
        color: "from-blue-500 to-purple-500",
        details: {
            text: `🏆 Proud Achievement – 1st Prize at Project Expo | Nagastra–2026

I am delighted to share that I have secured the 1st Prize in the Project Expo conducted during Nagastra–2026 (Annual Day Celebrations) at Kuppam Engineering College (Autonomous).

This recognition reflects the dedication, innovation, and consistent effort invested in presenting our project effectively. Competing alongside talented peers made this achievement even more meaningful and rewarding.

I extend my sincere gratitude to our respected HOD and mentor for their continuous guidance, encouragement, and invaluable support throughout this journey. Their mentorship played a crucial role in the successful presentation of our work.

Grateful to the management and organizing committee of Kuppam Engineering College for providing such a wonderful platform to showcase innovation and technical excellence.`,
            images: [
                "/achievements/nagastra_cert.jpg",
                "/achievements/nagastra_trophy.jpg"
            ]
        }
    },
    {
        title: "Certificate of Merit — 1M1B",
        description: "One Million for One Billion Workplace Experience",
        icon: <Star className="w-6 h-6" />,
        color: "from-green-500 to-emerald-500",
        details: {
            text: `Over five days in the 1M1B Workplace Experience, I gained hands-on exposure to real-world problem-solving, teamwork, and corporate workflows.

Led the development of “ScanGreen🍃” while applying SDLC principles and collaborating under tight deadlines. Pitched a Smart Attendance System using face recognition, receiving feedback on scalability, feasibility, and user impact.

Had the opportunity to present my project to Hon’ble CM N. Chandrababu Naidu, strengthening my confidence and communication skills. Engaged with industry mentors and leaders, gaining insights into business evaluation, innovation, and professional growth.

This experience strengthened my mindset, adaptability, and ability to build impactful, real-world technology solutions.`,
            images: [
                "/achievements/1m1b/cert.jpeg",
                "/achievements/1m1b/cert_receive.jpg",
                "/achievements/1m1b/cm_presentation.jpg",
                "/achievements/1m1b/group_1.jpg",
                "/achievements/1m1b/group_2.jpg",
                "/achievements/1m1b/group_3.jpg",
                "/achievements/1m1b/parth.jpg",
                "/achievements/1m1b/titan.jpg"
            ]
        }
    },
    {
        title: "Resource Person at PES CME",
        description: "Invited speaker on technology integration in healthcare systems at PES Institute of Medical Sciences.",
        icon: <Lightbulb className="w-6 h-6" />,
        color: "from-rose-500 to-pink-500",
        details: {
            text: `🎓 Continuing Medical Education (CME) – Bridging Medicine & Technology

I am honored to have participated as a Resource Person at the Continuing Medical Education (CME) program on “Bridging Medicine and Technology to Address Real World Health Challenges” organized by PES Institute of Medical Sciences & Research (PESIMSR), Kuppam.

📍 Kuppam, Andhra Pradesh
📅 24th December 2025

During the session, we presented our project titled: “Face-Based Patient Identification & Medical Record Retrieval System”. Our solution focuses on transforming healthcare delivery through intelligent face recognition technology that enables:

✅ Instant patient identification
✅ Secure and rapid medical record retrieval
✅ Reduced administrative workload
✅ Improved patient safety and efficiency

It was a privilege to share insights with esteemed doctors, faculty members, and healthcare professionals, and to discuss how emerging technologies can address real-world clinical challenges.

I sincerely thank the organizing committee and leadership team at PESIMSR for the opportunity and for recognizing our contribution with a Certificate of Appreciation. I extend my heartfelt gratitude to our respected HOD and mentor G.N.Kodanda Ramaiah garu for their constant guidance, encouragement, and support throughout this journey.`,
            images: [
                "/achievements/pes_cme/1.jpg",
                "/achievements/pes_cme/2.jpg",
                "/achievements/pes_cme/3.jpg",
                "/achievements/pes_cme/4.jpg"
            ]
        }
    },
    {
        title: "2nd Prize — Project Expo",
        description: "National Level Technical Symposium TEKWARZZ-2K25 at PSV College of Engineering",
        icon: <Trophy className="w-6 h-6" />,
        color: "from-amber-400 to-orange-500",
        details: {
            text: `🥈 Secured 2nd Prize in the National Level Technical Symposium "TEKWARZZ-2K25" organized by the Department of ECE at P.S.V. College of Engineering and Technology on 15th October 2025.

This recognition was awarded for our project presentation during the Project Expo, competing against talented teams at a national level. The experience allowed us to demonstrate technical excellence and innovative problem-solving in the field of Electronics and Communication Engineering.`,
            images: [
                "/achievements/tekwarzz/cert.jpg",
                "/achievements/tekwarzz/1.jpg",
                "/achievements/tekwarzz/2.jpg"
            ]
        }
    },
    {
        title: "Certificate of Appreciation — Agastya",
        description: "Innovation Expo at Navarachana Innovation Hub 10th Anniversary",
        icon: <Star className="w-6 h-6" />,
        color: "from-cyan-500 to-blue-500",
        details: {
            text: `🌟 Proud Moment of Recognition 🌟

I am honored to receive a Certificate of Appreciation from Agastya International Foundation during the Navarachana Innovation Hub – 10th Anniversary Celebrations, held at the Creativity Campus on 23rd February 2026.

My project titled “Smart Attendance System using Face Recognition” was recognized for its innovation, creativity, and problem-solving approach during the Innovation Expo. This recognition strengthens my commitment toward developing practical, technology-driven solutions that address real-world challenges in the education sector.

Receiving the “I Am an Innovator” badge from the Navarachana Innovation & Entrepreneurship initiative is truly motivating and inspires me to continue exploring impactful innovations.`,
            images: [
                "/achievements/agastya/cert.jpg",
                "/achievements/agastya/badge.jpg",
                "/achievements/agastya/presentation.jpg",
                "/achievements/agastya/group.jpg"
            ]
        }
    },
    {
        title: "CreateX 2026 — Prototype Fest",
        description: "National Level Idea & Prototype Fest at Marudhar Kesari Jain College",
        icon: <Lightbulb className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500",
        details: {
            text: `Innovation begins with solving real problems.

Proud to share that our team showcased “ClassLens – Smart Attendance System using Face Recognition” at the CreateX 2026 National Level Idea & Prototype Fest, hosted by Marudhar Kesari Jain College for Women (Autonomous) in collaboration with StartupTN and Anna University ED Cell on 27th February 2026.

Our project focuses on automating classroom attendance using AI-based face recognition and embedded systems, reducing manual effort while improving accuracy and efficiency. This event provided an incredible platform to present our prototype, receive valuable feedback, and engage with innovators and mentors.

Proud of my team and excited to continue building impactful solutions.`,
            images: [
                "/achievements/createx/cert.jpg",
                "/achievements/createx/team.jpg"
            ]
        }
    },
    {
        title: "Paper Presentation — NCEECT 2026",
        description: "Presented research on 'Class Lens' at the National Conference",
        icon: <Code className="w-6 h-6" />,
        color: "from-blue-600 to-cyan-500",
        details: {
            text: `🎓 Paper Presentation at NCEECT-2026

I am proud to have successfully presented our research paper titled “Class Lens - Smart Attendance System Using Face Recognition” at the National Conference on Electrical, Electronics and Communication Technologies (NCEECT-2026).

📍 Kuppam Engineering College (Autonomous)
📅 31st March 2026

The conference, organized by the Department of ECE & EEE, provided an excellent platform to share our innovative solution for automating classroom attendance using AI. It was a privilege to engage with experts and fellow researchers, discussing the technical challenges and real-world impact of face recognition technology in education.`,
            images: [
                "/achievements/nceect_2026.jpg"
            ]
        }
    },
];

const Certifications: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true });
    const certsRef = useRef<HTMLDivElement>(null);
    const isCertsInView = useInView(certsRef, { once: true, margin: "-50px" });

    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedCertImage, setSelectedCertImage] = useState<string | null>(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedAchievement || selectedCertImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedAchievement, selectedCertImage]);

    const nextImage = () => {
        if (selectedAchievement?.details?.images) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedAchievement.details!.images.length);
        }
    };

    const prevImage = () => {
        if (selectedAchievement?.details?.images) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedAchievement.details!.images.length) % selectedAchievement.details!.images.length);
        }
    };

    return (
        <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <motion.div
                ref={headerRef}
                initial={{ opacity: 0, y: 20 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-4xl font-bold text-[var(--text-primary)]">Certifications & Achievements</h2>
                <p className="mt-3 text-[var(--text-secondary)] max-w-lg">
                    Continuous learning through industry-recognized certifications and competitive wins.
                </p>
            </motion.div>

            {/* Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {achievements.map((achievement, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: idx * 0.15, duration: 0.6 }}
                        onClick={() => {
                            if (achievement.details) {
                                setSelectedAchievement(achievement);
                                setCurrentImageIndex(0);
                            }
                        }}
                        className={`group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 hover:shadow-lg transition-all duration-300 ${achievement.details ? 'cursor-pointer hover:border-blue-400' : ''}`}
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-white mb-4`}>
                            {achievement.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                            {achievement.title}
                            {achievement.details && <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Click for details</span>}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">{achievement.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* Certifications Grid */}
            <div ref={certsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {certifications.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isCertsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: idx * 0.08, duration: 0.5 }}
                        onClick={() => cert.image && setSelectedCertImage(cert.image)}
                        className={`flex items-start gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:shadow-md transition-all duration-300 group ${cert.image ? 'cursor-pointer hover:border-blue-400' : ''}`}
                    >
                        <div className={`mt-0.5 ${cert.color} group-hover:scale-110 transition-transform`}>
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
                                {cert.title}
                                {cert.image && <span className="text-[9px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded">View</span>}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">{cert.issuer}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Achievement Detail Modal - Portaled to body to escape transform contexts */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedAchievement && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedAchievement(null)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                className="relative w-full max-w-6xl h-full max-h-[90vh] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row border border-white/10"
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedAchievement(null)}
                                    className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-20 backdrop-blur-md border border-white/10 shadow-lg"
                                >
                                    <X size={28} />
                                </button>

                                {/* Left Side: Matter (Text) */}
                                <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-gradient-to-br from-slate-800/50 to-transparent flex flex-col justify-center">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-8"
                                    >
                                        <div className={`w-20 h-1.5 bg-gradient-to-r ${selectedAchievement.color} rounded-full`} />
                                        <h2 className="text-xl md:text-3xl font-serif text-white font-bold leading-tight">
                                            {selectedAchievement.title}
                                        </h2>
                                        <div className="text-slate-200 text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                                            {selectedAchievement.details?.text}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Right Side: Images (Slider) */}
                                <div className="flex-1 relative bg-black/20">
                                    <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={currentImageIndex}
                                                src={selectedAchievement.details?.images?.[currentImageIndex]}
                                                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                                                transition={{ duration: 0.5, ease: "circOut" }}
                                                className="w-full h-full object-contain rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                            />
                                        </AnimatePresence>

                                        {/* Slider Controls */}
                                        <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                className="w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-md pointer-events-auto border border-white/5 shadow-xl group"
                                            >
                                                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                className="w-14 h-14 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-md pointer-events-auto border border-white/5 shadow-xl group"
                                            >
                                                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Image Indicators */}
                                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                                            {selectedAchievement.details?.images?.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImageIndex ? 'bg-white w-10' : 'bg-white/20 w-3'}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

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
