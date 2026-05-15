import React, { useState, useEffect, useRef } from 'react';
import { Copy, FileText, Instagram, Github, Linkedin, Send, MapPin, Phone, ArrowUp, Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const Contact: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const email = "udayvenkatkalle7@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { Icon: Github, href: 'https://github.com/uday0438', label: 'GitHub' },
    { Icon: Linkedin, href: 'www.linkedin.com/in/kalle-uday-bhaskar', label: 'LinkedIn' },
    { Icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
    { Icon: Send, href: 'https://t.me/', label: 'Telegram' },
  ];

  return (
    <motion.footer
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="pt-24 pb-12 px-6 md:px-12 bg-[var(--bg-secondary)] relative border-t border-[var(--border-color)]"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-serif text-[var(--text-primary)] mb-4">Stay connected</h2>
        <a href={`mailto:${email}`} className="text-lg text-[var(--text-secondary)] hover:text-blue-500 transition-colors">
          {email}
        </a>
        <p className="mt-4 text-[var(--text-muted)] text-sm">
          Crafted with creativity and passion. Let's stay connected — reach out anytime!
        </p>

        {/* Email & Subject inputs */}
        <div className="mt-12 bg-[var(--bg-primary)] p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto border border-[var(--border-color)]">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 px-6 py-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none focus:ring-2 focus:ring-blue-400/50 text-[var(--text-primary)] placeholder-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Subject"
            className="flex-1 px-6 py-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] outline-none focus:ring-2 focus:ring-blue-400/50 text-[var(--text-primary)] placeholder-[var(--text-muted)]"
          />
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={handleCopyEmail}
            className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] font-medium hover:border-blue-400 hover:shadow-md flex items-center gap-2 transition-all"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            {copied ? 'Copied!' : 'Copy Email'}
          </button>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] font-medium hover:border-purple-400 hover:shadow-md flex items-center gap-2 transition-all"
          >
            <FileText size={18} /> View Resume
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&to=${email}&su=Hello%20Uday!`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all"
          >
            Contact Now
          </a>
        </div>

        {/* Social links */}
        <div className="mt-16 flex justify-center gap-4">
          {socialLinks.map(({ Icon, href, label }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-secondary)] hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-lg hover:scale-110 transition-all duration-300"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Location & Phone */}
        <div className="mt-12 space-y-2 text-[var(--text-muted)] text-sm">
          <div className="flex items-center justify-center gap-2">
            <MapPin size={16} />
            <span>Dharmavaram, 515671, AP, India</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Phone size={16} />
            <span>+91 94401 00517</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-24 pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-muted)] max-w-4xl mx-auto">
        <p>© Uday 2026</p>
        <p className="font-mono mt-2 md:mt-0">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
        <button
          onClick={scrollToTop}
          className="mt-4 md:mt-0 flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors group"
        >
          Back to top <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </motion.footer>
  );
};

export default Contact;