import React, { useRef, MouseEvent, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Cpu, Wifi, Droplets, Eye, Leaf, Sprout, ShoppingBag, X, CheckCircle2, AlertCircle, Lightbulb, Siren, Compass } from 'lucide-react';
import { useTheme } from '../App';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  glowColor: string; // Dynamic hover glow
  icon: React.ReactNode;
  github?: string;
  demo?: string;
  thumbnailGradient: string; // Stylized abstract preview
  image?: string; // Optional real image path
  details?: {
    challenge: string;
    solution: string;
    results: string[];
  };
}

const projects: Project[] = [
  {
    id: 9,
    title: "Smart Attendance (Raspberry Pi)",
    category: "Computer Vision & IoT",
    description: "Advanced facial recognition attendance system utilizing a Raspberry Pi and webcam for robust and scalable deployment.",
    tags: ["Raspberry Pi", "Webcam", "Python", "OpenCV"],
    gradient: "from-indigo-500/10 to-violet-500/10",
    glowColor: "rgba(99, 102, 241, 0.15)",
    icon: <Eye className="w-6 h-6 text-indigo-400" />,
    github: "https://github.com/uday0438/Smart_Attendance_Raspi.git",
    demo: "https://smart-attendance-raspi.vercel.app/",
    thumbnailGradient: "from-indigo-600 via-violet-950 to-slate-950",
    image: "/smart_attendance_raspi_banner.png",
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
    id: 7,
    title: "SilkArt Website",
    category: "Craft E-Commerce",
    description: "Static E-commerce Website showcasing traditional craftsmanship with modern visual UI.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-pink-500/10 to-rose-500/10",
    glowColor: "rgba(244, 63, 94, 0.15)",
    icon: <ShoppingBag className="w-6 h-6 text-pink-400" />,
    github: "https://github.com/uday0438/SilkArt",
    demo: "https://silkart.vercel.app/",
    thumbnailGradient: "from-pink-600 via-rose-950 to-slate-950",
    image: "/silk_art.png",
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
    id: 1,
    title: "Contactless Attendance (ESP32)",
    category: "Edge AI & Embedded",
    description: "Face-recognition based attendance system using ESP32 and HuskyLens AI camera, automatically logging data to Google Sheets.",
    tags: ["ESP-32", "HuskyLens", "Google Sheets API"],
    gradient: "from-blue-500/10 to-cyan-500/10",
    glowColor: "rgba(59, 130, 246, 0.15)",
    icon: <Eye className="w-6 h-6 text-cyan-400" />,
    github: "https://github.com/uday0438/Smart_Attendance_System.git",
    thumbnailGradient: "from-cyan-600 via-blue-950 to-slate-950",
    image: "/smart_attendance_banner.jpg",
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
    id: 2,
    title: "Smart Door Unlocking System",
    category: "Edge AI & IoT",
    description: "IoT-enabled door lock with facial recognition using HuskyLens and Bluetooth connectivity via ESP32.",
    tags: ["ESP-32", "HuskyLens", "Bluetooth"],
    gradient: "from-purple-500/10 to-pink-500/10",
    glowColor: "rgba(168, 85, 247, 0.15)",
    icon: <Wifi className="w-6 h-6 text-purple-400" />,
    github: "https://github.com/uday0438/Smart-Door-Unlock.git",
    thumbnailGradient: "from-purple-600 via-pink-950 to-slate-950",
    image: "/smart_door_unlock.jpg",
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
    id: 12,
    title: "V2V Hazard Alert",
    category: "IoT & Wireless",
    description: "Infrastructure-independent LoRa-based Vehicle-to-Vehicle hazard communication system using ESP32 and SX1278 for real-time hazard alert transmission.",
    tags: ["LoRa", "ESP32", "C++", "Wireless"],
    gradient: "from-red-500/10 to-orange-500/10",
    glowColor: "rgba(239, 68, 68, 0.15)",
    icon: <AlertCircle className="w-6 h-6 text-red-400" />,
    github: "https://github.com/uday0438/V2V-HAZARD-ALERT",
    thumbnailGradient: "from-red-600 via-orange-950 to-slate-950",
    image: "/v2v_banner.png",
    details: {
      challenge: "Drivers often lack advanced warning of road hazards like accidents or sudden braking in areas with poor cellular network coverage.",
      solution: "Developed an infrastructure-independent Vehicle-to-Vehicle (V2V) communication system using ESP32 and SX1278 LoRa modules to establish long-range peer-to-peer connections for emergency warnings.",
      results: [
        "Real-Time Vehicle-to-Vehicle Hazard Communication",
        "Infrastructure-Independent LoRa Wireless Transmission",
        "OLED-Based Alert Visualization with Buzzer",
        "Low power consumption architecture"
      ]
    }
  },
  {
    id: 10,
    title: "Botanica AI Hub",
    category: "Precision Ag & AI",
    description: "Next-generation AI agricultural diagnostic system providing plant health reports, soil advice, and real-time market intelligence.",
    tags: ["React", "Node.js", "Gemini AI", "Precision Ag"],
    gradient: "from-emerald-500/10 to-teal-500/10",
    glowColor: "rgba(16, 185, 129, 0.15)",
    icon: <Leaf className="w-6 h-6 text-emerald-400" />,
    github: "https://github.com/uday0438/Botanica.git",
    demo: "https://botanica-garden.vercel.app/",
    thumbnailGradient: "from-emerald-600 via-teal-900 to-slate-950",
    image: "/botanica.png",
    details: {
      challenge: "Small-scale farmers lack access to precision diagnostic tools and real-time market data, often relying on guesswork for irrigation, pest control, and selling prices.",
      solution: "Developed an AI-powered platform using Google Gemini 1.5. It features multi-modal plant identification, satellite field monitoring via Sentinel-2 patterns, and live Mandi market telemetry (Agmarknet) for profit optimization.",
      results: [
        "Kaggle-grounded identification for 38+ plant classes",
        "NDVI field health telemetry monitoring from orbit",
        "Hyper-local weather risk intelligence and advice",
        "Live Indian market price tracking and analysis"
      ]
    }
  },
  {
    id: 11,
    title: "KEC Indoor Navigator",
    category: "Mobile & Sensor Fusion",
    description: "AI-powered indoor navigation application using sensor fusion and PDR for sub-meter accuracy in GPS-denied environments.",
    tags: ["React Native", "Node.js", "MongoDB", "Sensor Fusion"],
    gradient: "from-blue-500/10 to-indigo-500/10",
    glowColor: "rgba(59, 130, 246, 0.15)",
    icon: <Wifi className="w-6 h-6 text-blue-400" />,
    github: "https://github.com/uday0438/Indoor_Navigation.git",
    demo: "https://expo.dev/accounts/uday0438/projects/kec-indoor-nav/builds/cd5b2794-3954-4ea6-b40d-519174e968e2",
    thumbnailGradient: "from-blue-600 via-indigo-950 to-slate-950",
    image: "/kec_indoor_nav.png",
    details: {
      challenge: "GPS signals are unreliable indoors, making navigation in large campus buildings difficult. Existing beacon-based solutions are expensive and hard to maintain.",
      solution: "Engineered a mobile solution using React Native and Pedestrian Dead Reckoning (PDR). By fusing data from smartphone motion sensors and implementing Dijkstra's algorithm on a custom spatial graph, the app provides accurate turn-by-turn navigation without external hardware.",
      results: [
        "Achieved sub-meter indoor tracking accuracy",
        "Robust offline mode for campus Wi-Fi dead zones",
        "Multi-lingual turn-by-turn voice guidance",
        "Interactive SVG-based multi-floor mapping"
      ]
    }
  },
  {
    id: 3,
    title: "Water Level Monitoring",
    category: "Embedded & Automation",
    description: "Reliable water level monitoring system using an ultrasonic sensor and Arduino, featuring real-time percentage display and buzzer alerts.",
    tags: ["Arduino", "HC-SR04", "I2C LCD", "Buzzer"],
    gradient: "from-cyan-500/10 to-teal-500/10",
    glowColor: "rgba(6, 182, 212, 0.15)",
    icon: <Droplets className="w-6 h-6 text-cyan-400" />,
    github: "https://github.com/uday0438/water-level-monitor-ultrasonic.git",
    thumbnailGradient: "from-blue-600 via-cyan-950 to-slate-950",
    image: "/water_level_monitoring.png",
    details: {
      challenge: "Manual monitoring of water tanks often leads to overflows and water wastage, while complex IoT solutions can be expensive and difficult to maintain.",
      solution: "Engineered a cost-effective system using an HC-SR04 ultrasonic sensor and Arduino. The system calculates water volume percentages in real-time, displaying status on an I2C LCD and triggering a buzzer alert when the tank reaches 80% capacity.",
      results: [
        "Real-time measurement with high accuracy calibration",
        "Automated overflow prevention with buzzer alerts",
        "Clear status feedback via I2C LCD display",
        "Robust software filtering to eliminate sensor noise"
      ]
    }
  },
  {
    id: 4,
    title: "IoT & AI Smart Blind Stick",
    category: "Assistive Tech & IoT",
    description: "Assistive navigation device for visually impaired using ultrasonic sensors and NodeMCU, providing real-time obstacle detection with haptic and audio feedback.",
    tags: ["NodeMCU ESP8266", "HC-SR04", "Assistive Tech"],
    gradient: "from-amber-500/10 to-orange-500/10",
    glowColor: "rgba(245, 158, 11, 0.15)",
    icon: <Cpu className="w-6 h-6 text-amber-400" />,
    github: "https://github.com/uday0438/Smart-Blind-Stick.git",
    thumbnailGradient: "from-amber-600 via-orange-950 to-slate-950",
    image: "/smart_blind_stick.png",
    details: {
      challenge: "Visually impaired individuals face significant risks navigating unfamiliar environments, requiring a reliable way to detect obstacles beyond the reach of a traditional white cane.",
      solution: "Developed an intelligent stick using a NodeMCU (ESP8266) and HC-SR04 ultrasonic sensor. The system processes distance data in real-time and provides graded alerts (buzzer and vibration) based on obstacle proximity.",
      results: [
        "Reliable obstacle detection up to 100cm range",
        "Graded audio-haptic feedback patterns for distance",
        "Portable NodeMCU-based architecture with low latency",
        "Designed for future IoT cloud logging and GPS expansion"
      ]
    }
  },
  {
    id: 5,
    title: "ScanGreen",
    category: "Sustainability Frontend",
    description: "AI-Based Sustainability Platform prototype mapping daily products to calculated environmental impact scores.",
    tags: ["HTML", "CSS", "JavaScript", "AI Tools"],
    gradient: "from-emerald-500/10 to-teal-500/10",
    glowColor: "rgba(16, 185, 129, 0.15)",
    icon: <Sprout className="w-6 h-6 text-emerald-400" />,
    github: "https://github.com/uday0438/Scan-Green",
    demo: "https://scan-green-one.vercel.app/",
    thumbnailGradient: "from-emerald-700 via-emerald-950 to-slate-950",
    image: "/scan_green.png",
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
    id: 13,
    title: "Road-SOS",
    category: "AI & IoT Road Safety",
    description: "AI & IoT-powered post-crash emergency response ecosystem integrating real-time telemetry, geographic maps, and Google Gemini AI diagnostics to optimize the Golden Hour.",
    tags: ["React", "Express.js", "Gemini AI", "Leaflet"],
    gradient: "from-red-500/10 to-rose-500/10",
    glowColor: "rgba(239, 68, 68, 0.15)",
    icon: <Siren className="w-6 h-6 text-red-400" />,
    github: "https://github.com/uday0438/Road-sos.git",
    demo: "https://road-sos-wheat.vercel.app/",
    thumbnailGradient: "from-red-600 via-rose-950 to-slate-950",
    image: "/road_sos.png",
    details: {
      challenge: "The Golden Hour of post-crash response is critical. Delays in crash detection, lack of real-time severity details, and fragmented emergency routing lead to preventable fatalities.",
      solution: "Engineered an integrated software-hardware ecosystem that uses Leaflet map visualizations and Google Gemini AI to analyze mock vehicle sensor telemetry. It auto-generates diagnostic triage checklists and coordinates instant dispatch.",
      results: [
        "Autonomous accident triage with simulated real-time crash telemetry",
        "AI incident diagnostics generating structured checklists with Gemini 2.0 Flash",
        "Interactive Leaflet maps tracking crash sites and emergency units",
        "Vercel Serverless Function architecture for robust API routing"
      ]
    }
  },
  {
    id: 14,
    title: "Campus Compass",
    category: "Spatial UI/UX & Web Portal",
    description: "Premium spatial guidance hub and freshman survival portal for Amrita Amaravati featuring interactive 3D compass layouts, responsive bento grids, and GPA simulators.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    gradient: "from-orange-500/10 to-amber-500/10",
    glowColor: "rgba(249, 115, 22, 0.15)",
    icon: <Compass className="w-6 h-6 text-orange-400" />,
    github: "https://github.com/uday0438/Amaravathi.git",
    demo: "https://amaravathi.vercel.app/",
    thumbnailGradient: "from-orange-600 via-amber-950 to-slate-950",
    image: "/campus-compass.png",
    details: {
      challenge: "University freshers face informational bottlenecks, confusion over strict 75% attendance/CIA policies, and anxiety finding resources across scattered, disconnected platforms.",
      solution: "Developed Campus Compass, a premium spatial orientation hub. It features a responsive tilting 3D compass, bento grids detailing campus life, an interactive SGPA/CGPA marks calculator, and a vinyl audio player.",
      results: [
        "High-fidelity glassmorphic bento interfaces for multi-modal information delivery",
        "Dynamic SGPA & CGPA simulator mapping marks to projected semester GPAs",
        "Embedded HTML5 vinyl audio player with soundwave visualizers",
        "Optimized React 19 / Vite 6 rendering compiling in under 4.5 seconds"
      ]
    }
  }
];



const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { isDark } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  // 3D Parallax spring coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  // Custom cursor position tracker inside card for radial glow
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates for 3D rotation
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);

    // Pixel coordinates for inline radial gradient
    setGlowPos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 45, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -6 }}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full min-h-[460px] w-full rounded-[28px] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] dark:border-white/[0.06] hover:border-blue-500/50 dark:hover:border-white/[0.12] transition-colors duration-500 shadow-[0_4px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.4)] flex flex-col group"
      >
        {/* Mouse Tracking Radial Ambient Glow Overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, ${project.glowColor}, transparent 80%)`
          }}
        />

        {/* Top Abstract Graphical Thumbnail Container */}
        <div className="relative aspect-[5/2] w-full overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-card)]">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover bg-[var(--bg-card)] transition-transform duration-700 group-hover:scale-[1.03]" 
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-tr ${project.thumbnailGradient} opacity-90 transition-transform duration-700 group-hover:scale-105`} />
          )}
          
          {/* Subtle light lines in background representing electronics/wiring */}
          {!project.image && (
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
          )}



          {/* Float Icon representation */}
          {!project.image && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="w-16 h-16 rounded-[20px] bg-black/40 backdrop-blur-lg border border-white/[0.08] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                {project.icon}
              </div>
            </div>
          )}
        </div>

        {/* Content body */}
        <div 
          className="p-8 flex flex-col flex-1"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Title */}
          <h3 
            style={{ color: isDark ? '#ffffff' : '#0f172a' }}
            className="text-xl font-bold mb-2.5 tracking-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Card Footer tags and links */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 max-w-[70%]">
              {project.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#0f172a' }}
                  className="bg-[var(--chip-bg)] backdrop-blur-md px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-widest border border-[var(--border-color)] dark:bg-white/[0.03] dark:border-white/[0.08]"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span 
                  style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#0f172a' }}
                  className="bg-[var(--chip-bg)] px-1.5 py-0.5 rounded-md text-[9px] font-extrabold border border-[var(--border-color)] dark:bg-white/[0.03] dark:border-white/[0.08]"
                >
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            {/* Quick Demo & Github Action Buttons */}
            <div className="flex gap-2">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="View Code"
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                  className="w-9 h-9 rounded-full bg-[var(--chip-bg)] hover:bg-blue-600/10 border border-[var(--border-color)] hover:border-blue-500/50 flex items-center justify-center hover:text-blue-600! transition-all shadow-md dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/[0.08]"
                >
                  <Github size={15} className="text-current" />
                </a>
              )}
              {project.demo && (
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                  style={{ color: isDark ? '#ffffff' : '#0f172a' }}
                  className="w-9 h-9 rounded-full bg-[var(--chip-bg)] hover:bg-blue-600/10 border border-[var(--border-color)] hover:border-blue-500/50 flex items-center justify-center hover:text-blue-600! transition-all shadow-md dark:bg-white/[0.03] dark:hover:bg-white/[0.08] dark:border-white/[0.08]"
                >
                  <ExternalLink size={15} className="text-current" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { isDark } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <div className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative">
      
      {/* Background radial accent glow for Projects block */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Spacious heading section */}
      <div className="mb-24 text-center md:text-left flex flex-col items-center md:items-start">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400 mb-4 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Featured Works
        </span>
        <h2 
          style={{ color: isDark ? '#ffffff' : '#0f172a' }}
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none select-none font-sans"
        >
          Projects
        </h2>
        <p className="mt-6 text-base md:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed font-medium">
          A modular collection of IoT networks, computer vision setups, and embedded solutions bridging the physical and digital world.
        </p>
      </div>

      {/* Staggered Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;