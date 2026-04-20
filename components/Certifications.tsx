import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, BookOpen, Trophy, Star, Wifi, Cpu } from 'lucide-react';

interface Certification {
    title: string;
    issuer: string;
    icon: React.ReactNode;
    color: string;
}

const certifications: Certification[] = [
    { title: "Computer Architecture", issuer: "NPTEL", icon: <Cpu className="w-5 h-5" />, color: "text-blue-500" },
    { title: "MongoDB Basics Certification", issuer: "MongoDB University", icon: <BookOpen className="w-5 h-5" />, color: "text-green-500" },
    { title: "VLSI Design", issuer: "Internshala", icon: <Cpu className="w-5 h-5" />, color: "text-purple-500" },
    { title: "Getting Started with AI on Jetson Nano", issuer: "Nvidia", icon: <BookOpen className="w-5 h-5" />, color: "text-cyan-500" },
    { title: "Networking & Storage Essentials", issuer: "EDX", icon: <Wifi className="w-5 h-5" />, color: "text-amber-500" },
    { title: "Matlab OnRamp", issuer: "Matlab", icon: <Code className="w-5 h-5" />, color: "text-orange-500" },
    { title: "Introduction to Internet of Things", issuer: "NPTEL", icon: <Wifi className="w-5 h-5" />, color: "text-indigo-500" },
];

const achievements = [
    {
        title: "Smart India Hackathon Winner",
        description: "Won the prestigious national-level hackathon for innovative IoT solution",
        icon: <Trophy className="w-6 h-6" />,
        color: "from-amber-500 to-yellow-500",
    },
    {
        title: "1st Prize — Project Expo",
        description: "Nagastra 2026 at Kuppam Engineering College",
        icon: <Trophy className="w-6 h-6" />,
        color: "from-blue-500 to-purple-500",
    },
    {
        title: "Resource Person — PES CME",
        description: "Invited speaker on technology integration in healthcare (Dec 2025)",
        icon: <Lightbulb className="w-6 h-6" />,
        color: "from-rose-500 to-pink-500",
    },
    {
        title: "Certificate of Merit — 1M1B",
        description: "One Million for One Billion Workplace Experience",
        icon: <Star className="w-6 h-6" />,
        color: "from-green-500 to-emerald-500",
    },
];

const Certifications: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true });
    const certsRef = useRef<HTMLDivElement>(null);
    const isCertsInView = useInView(certsRef, { once: true, margin: "-50px" });

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
                        className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 hover:shadow-lg transition-all duration-300"
                    >
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${achievement.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`} />
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${achievement.color} flex items-center justify-center text-white mb-4`}>
                            {achievement.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{achievement.title}</h3>
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
                        className="flex items-start gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
                    >
                        <div className={`mt-0.5 ${cert.color} group-hover:scale-110 transition-transform`}>
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-[var(--text-primary)]">{cert.title}</h4>
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">{cert.issuer}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Certifications;
