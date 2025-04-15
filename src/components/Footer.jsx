import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaCodepen, FaDiscord, FaRegHeart } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineSparkles } from 'react-icons/hi';
import { SiBehance, SiDribbble, SiFramer, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const socialLinks = [
    { icon: <FaGithub size={isMobile ? 20 : 24} />, url: "https://github.com", name: "github", color: "from-gray-800 to-gray-900", hoverColor: "group-hover:from-gray-800 group-hover:to-gray-900" },
    { icon: <FaLinkedin size={isMobile ? 20 : 24} />, url: "https://linkedin.com", name: "linkedin", color: "from-blue-700 to-blue-800", hoverColor: "group-hover:from-blue-700 group-hover:to-blue-800" },
    { icon: <FaTwitter size={isMobile ? 20 : 24} />, url: "https://twitter.com", name: "twitter", color: "from-sky-500 to-sky-600", hoverColor: "group-hover:from-sky-500 group-hover:to-sky-600" },
    { icon: <SiDribbble size={isMobile ? 20 : 24} />, url: "https://dribbble.com", name: "dribbble", color: "from-pink-500 to-pink-600", hoverColor: "group-hover:from-pink-500 group-hover:to-pink-600" },
    { icon: <SiBehance size={isMobile ? 20 : 24} />, url: "https://behance.net", name: "behance", color: "from-blue-500 to-blue-600", hoverColor: "group-hover:from-blue-500 group-hover:to-blue-600" },
    { icon: <FaCodepen size={isMobile ? 20 : 24} />, url: "https://codepen.io", name: "codepen", color: "from-gray-700 to-gray-800", hoverColor: "group-hover:from-gray-700 group-hover:to-gray-800" },
    { icon: <HiOutlineMail size={isMobile ? 20 : 24} />, url: "mailto:email@example.com", name: "email", color: "from-amber-500 to-amber-600", hoverColor: "group-hover:from-amber-500 group-hover:to-amber-600" },
    { icon: <FaDiscord size={isMobile ? 20 : 24} />, url: "https://discord.com", name: "discord", color: "from-indigo-500 to-indigo-600", hoverColor: "group-hover:from-indigo-500 group-hover:to-indigo-600" },
  ];

  const techStack = [
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" />, color: "bg-gradient-to-r from-gray-800 to-gray-900" },
    { name: "React", icon: <div className="text-cyan-400">⚛️</div>, color: "bg-gradient-to-r from-cyan-500 to-cyan-600" },
    { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" />, color: "bg-gradient-to-r from-cyan-400 to-cyan-500" },
    { name: "Framer", icon: <SiFramer className="text-pink-500" />, color: "bg-gradient-to-r from-pink-500 to-pink-600" },
  ];

  // 3D tilt effect for cards
  const handleTilt = (e, setTilt) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
      className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#0a0f1a] dark:to-[#020617] text-gray-800 dark:text-gray-300 pt-28 pb-16 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden"
    >
      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white dark:bg-gray-600 opacity-10"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: [null, Math.random() * 100],
              y: [null, Math.random() * 100],
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }
            }}
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
            }}
          />
        ))}
      </div>

      {/* Dynamic gradient cursor follower */}
      <motion.div 
        className="fixed pointer-events-none z-50 w-96 h-96 rounded-full opacity-10 blur-3xl"
        animate={{
          x: cursorPosition.x - 192,
          y: cursorPosition.y - 192,
          transition: { type: "spring", damping: 30, stiffness: 200 }
        }}
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.5) 0%, rgba(59,130,246,0.5) 50%, transparent 70%)"
        }}
      />

      {/* Grid with animated lines */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                strokeOpacity="0.1"
                className="text-gray-400 dark:text-gray-700"
              />
              <motion.path 
                d="M 0 40 L 40 40 40 0" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
                strokeDasharray="0 100"
                className="text-pink-500 dark:text-cyan-400"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center relative z-10">
        {/* Connect section with 3D card effect */}
        <motion.div 
          className="w-full max-w-4xl text-center mb-20 group perspective-1000"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <div 
            className="relative bg-white dark:bg-gray-900/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform-style-preserve-3d"
            onMouseMove={(e) => handleTilt(e, (tilt) => {
              e.currentTarget.style.transform = `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;
            })}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
            }}
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-pink-500/10 dark:to-cyan-500/10 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-gray-200 dark:to-gray-800 opacity-20" />
            </div>
            
            <motion.h3 
              className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-amber-500 leading-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Let's Create the Future Together
            </motion.h3>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              I'm passionate about building innovative digital experiences that push boundaries. Whether you have a project in mind or just want to connect, I'd love to hear from you.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <a
                href="mailto:hello@example.com"
                className="relative px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-amber-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <HiOutlineMail size={24} />
                  <span>Get in Touch</span>
                </span>
              </a>
              
              <a
                href="#"
                className="relative px-8 py-4 rounded-full bg-transparent text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                <span>View My Work</span>
                <HiOutlineSparkles className="text-amber-500" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Social links with advanced hover effects */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link) => (
            <motion.div 
              key={link.name}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "0px" }}
              onHoverStart={() => setHoveredIcon(link.name)}
              onHoverEnd={() => setHoveredIcon(null)}
            >
              <motion.span
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${link.color} blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-500`}
              />
              
              <motion.a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-800 transition-all duration-300 backdrop-blur-sm group-hover:rounded-xl overflow-hidden"
                whileHover={{ 
                  y: -8,
                  scale: 1.1,
                  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/20" />
                <span className="relative z-10">{link.icon}</span>
              </motion.a>
              
              <motion.span 
                className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {link.name}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech stack with animated underline */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
            Powered by
          </div>
          
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              whileHover={{ y: -4 }}
              className={`${tech.color} text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm md:text-base shadow-sm relative overflow-hidden group`}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-xs md:text-sm">{tech.icon}</span>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright with animated signature effect */}
        <motion.div 
          className="flex flex-col items-center gap-4 text-center relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <svg 
              className="w-24 h-auto text-gray-700 dark:text-gray-300"
              viewBox="0 0 200 50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M10,25 Q30,5 50,25 T90,25 T130,25 T170,25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="0 1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
          </div>
          
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            &copy; {currentYear} MD.SAIDUZZAMAN SAAD. All rights reserved.
          </p>
          
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-600 flex items-center gap-1">
            Made with <FaRegHeart className="text-pink-500 animate-pulse" /> and React
          </p>
        </motion.div>

        {/* Back to top button with morphing shape */}
        <AnimatePresence>
          {scrollY > 300 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                borderRadius: ["50%", "30%", "50%"],
                transition: { 
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2
                }
              }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed right-6 bottom-6 md:right-8 md:bottom-8 w-14 h-14 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center z-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              aria-label="Back to top"
            >
              <div className="relative w-6 h-6">
                <motion.span 
                  className="absolute top-0 left-0 w-full h-0.5 bg-gray-700 dark:bg-gray-300 transform origin-center"
                  animate={{
                    rotate: [0, 45, 0],
                    y: [0, 6, 0],
                    transition: { 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                />
                <motion.span 
                  className="absolute top-0 left-0 w-full h-0.5 bg-gray-700 dark:bg-gray-300 transform origin-center"
                  animate={{
                    rotate: [0, -45, 0],
                    y: [0, -6, 0],
                    transition: { 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }
                  }}
                />
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
};

export default Footer;
