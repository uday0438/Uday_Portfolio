import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Briefcase, Code, Lightbulb } from 'lucide-react';

interface TimelineItem {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const timelineData: TimelineItem[] = [
    {
        year: "2022",
        title: "Started B.Tech in ECE",
        subtitle: "Kuppam Engineering College — GPA: 7.6",
        description: "Began pursuing Electronics and Communication Engineering with a focus on digital electronics, VLSI design, and embedded systems.",
        icon: <GraduationCap className="w-5 h-5" />,
        color: "from-blue-500 to-blue-600",
    },
    {
        year: "2023",
        title: "First IoT Projects",
        subtitle: "Smart Blind Stick & Water Level Alert",
        description: "Built hands-on IoT projects using ESP32, sensors, and GSM modules to solve real-world problems for visually impaired and water management.",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "from-amber-500 to-orange-500",
    },
    {
        year: "2024",
        title: "Smart India Hackathon Winner",
        subtitle: "National Level Achievement",
        description: "Won the prestigious Smart India Hackathon with an innovative IoT solution, competing against thousands of teams nationwide.",
        icon: <Briefcase className="w-5 h-5" />,
        color: "from-purple-500 to-pink-500",
    },
    {
        year: "2024",
        title: "IoT Internship — APSCHE",
        subtitle: "Council for Skills and Competencies",
        description: "Completed IoT internship through the Council for Skills and Competencies by APSCHE, gaining industry exposure in embedded systems and IoT development.",
        icon: <Briefcase className="w-5 h-5" />,
        color: "from-green-500 to-emerald-500",
    },
    {
        year: "2025",
        title: "Advanced Projects & Research",
        subtitle: "Attendance System & Smart Door Lock",
        description: "Developed face-recognition systems with HuskyLens AI camera and ESP32, integrating Google Sheets API and Bluetooth connectivity for real-world applications.",
        icon: <Code className="w-5 h-5" />,
        color: "from-cyan-500 to-teal-500",
    },
    {
        year: "2025",
        title: "1M1B Workplace Experience",
        subtitle: "Jan–Feb 2025",
        description: "5-day industry immersion on sustainability, emerging technologies, and workplace readiness with Aditya Birla Fashion & Retail Ltd.",
        icon: <Briefcase className="w-5 h-5" />,
        color: "from-indigo-500 to-violet-500",
    },
    {
        year: "2025",
        title: "Resource Person at PES CME",
        subtitle: "PES Institute of Medical Sciences and Research (Dec 2025)",
        description: "Invited speaker on technology integration in healthcare systems.",
        icon: <Lightbulb className="w-5 h-5" />,
        color: "from-rose-500 to-pink-500",
    }
];

const TimelineCard: React.FC<{ item: TimelineItem; index: number; isLeft: boolean }> = ({ item, index, isLeft }) => {
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
