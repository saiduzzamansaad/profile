import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaRegMoon, FaSun } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiLeetcode } from 'react-icons/si';
import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [scrollY, setScrollY] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Check for dark mode preference and allow toggle
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    
    const handler = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: <FaGithub size={20} />, url: "https://github.com", name: "GitHub" },
    { icon: <FaLinkedin size={20} />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <FaTwitter size={20} />, url: "https://twitter.com", name: "Twitter" },
    { icon: <HiOutlineMail size={20} />, url: "saiduzzaman113@gmail.com", name: "Email" },
    { icon: <SiLeetcode size={20} />, url: "https://leetcode.com/u/saad3620/", name: "LeetCode" },
  ];

  const techStack = [
    { name: "Next.js", icon: <SiNextdotjs size={16} />, color: "text-black dark:text-white" },
    { name: "TypeScript", icon: <SiTypescript size={16} />, color: "text-blue-600 dark:text-blue-400" },
    { name: "Tailwind", icon: <SiTailwindcss size={16} />, color: "text-cyan-500 dark:text-cyan-400" },
  ];

  // Gradient colors for dark/light mode
  const bgGradient = isDarkMode 
    ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" 
    : "bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50";

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`w-full ${bgGradient} ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      } py-12 border-t ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } relative overflow-hidden`}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Animated background elements */}
      <AnimatePresence>
        {isHovering && (
          <>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full ${
                isDarkMode ? 'bg-purple-500' : 'bg-indigo-300'
              } blur-3xl`}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full ${
                isDarkMode ? 'bg-blue-500' : 'bg-cyan-300'
              } blur-3xl`}
            />
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dark mode toggle */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
            } shadow-lg transition-all duration-300 flex items-center justify-center`}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" size={18} />
            ) : (
              <FaRegMoon className="text-indigo-600" size={18} />
            )}
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-full ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              } shadow-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden group`}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100"
                initial={{ width: 0 }}
                whileHover={{ width: '100%', opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {techStack.map((tech) => (
            <motion.div
              key={tech.name}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg hover:shadow-md transition-all`}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={tech.color}>{tech.icon}</span>
              <span>{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm mb-2">
            &copy; {currentYear} MD.SAIDUZZAMAN SAAD. All rights reserved.
          </p>
          <motion.p 
            className="text-xs flex items-center justify-center gap-1"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span> 
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaHeart className="text-pink-500" />
            </motion.span>
            <span>and modern web tech</span>
          </motion.p>
        </motion.div>

        {/* Back to top button - Mobile only */}
        <AnimatePresence>
          {scrollY > 300 && isMobile && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`fixed right-6 bottom-6 w-14 h-14 rounded-full ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg flex items-center justify-center z-50`}
              aria-label="Back to top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDarkMode ? "#fff" : "#000"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <path d="M18 15l-6-6-6 6" />
              </motion.svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.footer>
  );
};

export default Footer;
