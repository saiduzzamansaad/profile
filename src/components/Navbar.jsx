import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChevronDown, FaChevronRight, FaGem } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { RiSparklingFill } from 'react-icons/ri';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const sections = document.querySelectorAll('section');
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 300 && window.scrollY < sectionTop + sectionHeight - 300) {
          setActiveLink(`#${section.id}`);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const links = [
    { id: 1, name: 'Home', href: '#home', icon: <RiSparklingFill className="text-pink-400" /> },
    { 
      id: 2, 
      name: 'About', 
      href: '#about', 
      subLinks: [
        { name: 'Bio', href: '#bio' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' }
      ],
      icon: <FaGem className="text-violet-400" />
    },
    { id: 3, name: 'Skills', href: '#skills', icon: <RiSparklingFill className="text-pink-400" /> },
    { 
      id: 4, 
      name: 'Projects', 
      href: '#projects', 
      subLinks: [
        { name: 'Web Apps', href: '#web' },
        { name: 'Mobile Apps', href: '#mobile' },
        { name: 'Open Source', href: '#opensource' }
      ],
      icon: <FaGem className="text-violet-400" />
    },
    { id: 5, name: 'Contact', href: '#contact', icon: <RiSparklingFill className="text-pink-400" /> },
  ];

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        backgroundColor: scrolled ? 'rgba(10, 25, 47, 0.98)' : 'rgba(10, 25, 47, 0.9)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(6px)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.3)' : 'none'
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.32, 0.72, 0, 1],
        backgroundColor: { duration: 0.4 }
      }}
      className={`fixed w-full h-20 md:h-24 flex justify-between items-center px-4 sm:px-8 lg:px-16 text-gray-300 z-50 border-b border-gray-700/50`}
    >
      {/* Logo */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <motion.a 
          href="#home" 
          className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-pink-400 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="flex items-center">
            <RiSparklingFill className="mr-1 sm:mr-2 text-pink-400" />
            <span className="hidden sm:inline">DevPortfolio</span>
            <span className="sm:hidden">DP</span>
            <RiSparklingFill className="ml-1 sm:ml-2 text-violet-400" />
          </span>
        </motion.a>
      </motion.div>

      {/* Mobile Navigation Toggle */}
      <motion.div 
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-50 text-gray-300 md:hidden relative p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {nav ? (
          <>
            <motion.div 
              className="absolute inset-0 bg-pink-500/10 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <FaTimes size={24} className="relative text-pink-400" />
          </>
        ) : (
          <>
            <motion.div 
              className="absolute inset-0 bg-violet-500/10 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <FaBars size={24} className="relative" />
          </>
        )}
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {nav && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setNav(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 300,
                bounce: 0.1
              }}
              className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-[#0a192f] z-40 shadow-2xl border-l border-gray-700/50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="p-4 sm:p-6 border-b border-gray-700/50 flex justify-between items-center bg-[#0d1b36]">
                  <a 
                    href="#home" 
                    className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400"
                    onClick={() => {
                      setNav(false);
                      setActiveLink('#home');
                    }}
                  >
                    DevPortfolio
                  </a>
                  <button 
                    onClick={() => setNav(false)}
                    className="p-1 sm:p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <FaTimes className="text-gray-400 hover:text-white text-lg" />
                  </button>
                </div>
                
                {/* Navigation Links */}
                <ul className="flex-1 p-2 sm:p-4 space-y-1 overflow-y-auto">
                  {links.map(({ id, name, href, subLinks, icon }) => (
                    <motion.li 
                      key={id}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ 
                        x: 0, 
                        opacity: 1,
                        transition: { 
                          delay: id * 0.05, 
                          duration: 0.3, 
                          ease: [0.22, 1, 0.36, 1] 
                        }
                      }}
                      className="rounded-lg overflow-hidden"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <a 
                            href={href} 
                            className={`flex-1 py-3 px-3 sm:py-4 sm:px-4 rounded-lg flex items-center ${
                              activeLink === href 
                                ? 'bg-gray-800/50 text-white' 
                                : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
                            } transition-all duration-300`}
                            onClick={(e) => {
                              if (!subLinks) {
                                setNav(false);
                                setActiveLink(href);
                              } else {
                                e.preventDefault();
                                toggleExpand(id);
                              }
                            }}
                          >
                            <span className="mr-2 sm:mr-3 text-base sm:text-lg">
                              {React.cloneElement(icon, {
                                className: `${icon.props.className} ${
                                  activeLink === href ? 'opacity-100' : 'opacity-80'
                                }`
                              })}
                            </span>
                            <span className="text-base sm:text-lg">{name}</span>
                          </a>
                          
                          {subLinks && (
                            <button 
                              onClick={() => toggleExpand(id)}
                              className="p-1 sm:p-2 mr-1 rounded-full hover:bg-gray-700/30 transition-all"
                            >
                              <FaChevronDown className={`transition-transform duration-300 text-xs ${
                                expandedItems[id] ? 'rotate-180 text-pink-400' : 'text-gray-500'
                              }`} />
                            </button>
                          )}
                        </div>
                        
                        {/* Sublinks dropdown */}
                        {subLinks && (
                          <motion.div 
                            className="pl-2 sm:pl-4 space-y-1"
                            initial={{ height: 0 }}
                            animate={{ 
                              height: expandedItems[id] ? 'auto' : 0,
                              transition: { duration: 0.3 }
                            }}
                            style={{ overflow: 'hidden' }}
                          >
                            {subLinks.map((subLink, index) => (
                              <motion.a 
                                key={index}
                                href={subLink.href}
                                className={`block py-2 px-3 sm:py-3 sm:px-4 pl-8 sm:pl-12 rounded-lg transition-all duration-300 flex items-center ${
                                  activeLink === subLink.href
                                    ? 'bg-gray-800/50 text-white'
                                    : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
                                }`}
                                onClick={() => {
                                  setNav(false);
                                  setActiveLink(subLink.href);
                                }}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ 
                                  opacity: expandedItems[id] ? 1 : 0,
                                  x: expandedItems[id] ? 0 : 10,
                                  transition: { delay: index * 0.05 }
                                }}
                              >
                                <FaChevronRight className="mr-2 text-xs text-pink-400/80" />
                                <span className="text-sm sm:text-base">{subLink.name}</span>
                              </motion.a>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Footer with CTA */}
                <div className="p-4 sm:p-6 border-t border-gray-700/50 bg-[#0d1b36]">
                  <motion.a
                    href="#contact"
                    className="block w-full py-3 sm:py-4 text-center bg-gradient-to-r from-pink-600 to-violet-600 rounded-lg sm:rounded-xl text-white font-semibold shadow-lg relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setNav(false);
                      setActiveLink('#contact');
                    }}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-violet-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <span className="relative flex items-center justify-center text-sm sm:text-base">
                      <RiSparklingFill className="mr-2 animate-pulse" />
                      Get In Touch
                    </span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
