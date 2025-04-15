import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen, FaDiscord } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineSparkles } from 'react-icons/hi';
import { SiBehance, SiDribbble, SiFramer, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: <FaGithub size={isMobile ? 20 : 24} />, url: "https://github.com", name: "github", color: "from-gray-800 to-gray-900" },
    { icon: <FaLinkedin size={isMobile ? 20 : 24} />, url: "https://linkedin.com", name: "linkedin", color: "from-blue-700 to-blue-800" },
    { icon: <FaTwitter size={isMobile ? 20 : 24} />, url: "https://twitter.com", name: "twitter", color: "from-sky-500 to-sky-600" },
    { icon: <SiDribbble size={isMobile ? 20 : 24} />, url: "https://dribbble.com", name: "dribbble", color: "from-pink-500 to-pink-600" },
    { icon: <SiBehance size={isMobile ? 20 : 24} />, url: "https://behance.net", name: "behance", color: "from-blue-500 to-blue-600" },
    { icon: <FaCodepen size={isMobile ? 20 : 24} />, url: "https://codepen.io", name: "codepen", color: "from-gray-700 to-gray-800" },
    { icon: <HiOutlineMail size={isMobile ? 20 : 24} />, url: "mailto:email@example.com", name: "email", color: "from-amber-500 to-amber-600" },
    { icon: <FaDiscord size={isMobile ? 20 : 24} />, url: "https://discord.com", name: "discord", color: "from-indigo-500 to-indigo-600" },
  ];

  const techStack = [
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" />, color: "bg-gradient-to-r from-gray-800 to-gray-900" },
    { name: "React", icon: <div className="text-cyan-400">⚛️</div>, color: "bg-gradient-to-r from-cyan-500 to-cyan-600" },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" />, color: "bg-gradient-to-r from-cyan-400 to-cyan-500" },
    { name: "Framer", icon: <SiFramer className="text-pink-500" />, color: "bg-gradient-to-r from-pink-500 to-pink-600" },
  ];

  const glowVariants = {
    initial: { scale: 1, opacity: 0 },
    hover: { 
      scale: 1.5,
      opacity: 0.8,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const iconVariants = {
    initial: { y: 0, scale: 1 },
    hover: { 
      y: -8,
      scale: 1.1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.1
      }
    }
  };

  const floatingVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        duration: 4 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5
      }
    })
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
      className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0a0f1a] dark:to-[#020617] text-gray-800 dark:text-gray-300 pt-20 pb-12 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden"
    >
      {/* Floating gradient bubbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="absolute rounded-full opacity-10 dark:opacity-5"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                ['#ec4899', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)]
              }, transparent 70%)`,
              filter: "blur(40px)"
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-[0.03] bg-[length:40px_40px] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)]" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center relative z-10">
        {/* Connect section */}
        <motion.div 
          className="w-full max-w-3xl text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-amber-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Let's Build Something Extraordinary
          </motion.h3>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            I'm always open to discussing product design work or partnership opportunities. 
            Let's connect and create something amazing together.
          </motion.p>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            <a
              href="mailto:hello@example.com"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
            >
              <HiOutlineMail size={24} />
              <span>Get in Touch</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Social links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {socialLinks.map((link) => (
            <motion.div 
              key={link.name}
              className="relative"
              variants={itemVariants}
              onHoverStart={() => setHoveredIcon(link.name)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <motion.span
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${link.color} blur-md`}
                variants={glowVariants}
                initial="initial"
                animate={hoveredIcon === link.name ? "hover" : "initial"}
              />
              <motion.a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-gray-900 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-800 transition-all backdrop-blur-sm"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
              >
                {link.icon}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech stack */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ y: -4 }}
              className={`${tech.color} text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm md:text-base shadow-sm`}
            >
              <span className="text-xs md:text-sm">{tech.icon}</span>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            &copy; {currentYear} MD.SAIDUZZAMAN SAAD. All rights reserved.
          </p>
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600">
            Crafted with passion and attention to detail.
          </p>
        </motion.div>

        {/* Back to top button (appears on scroll) */}
        <AnimatePresence>
          {scrollY > 300 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed right-6 bottom-6 md:right-8 md:bottom-8 w-12 h-12 rounded-full bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center z-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Back to top"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-700 dark:text-gray-300"
              >
                <path d="M18 15l-6-6-6 6"/>
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
};

export default Footer;
