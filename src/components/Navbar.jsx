import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaChevronDown, FaGem } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { RiSparklingFill } from 'react-icons/ri';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active link based on scroll position
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

  const links = [
    { id: 1, name: 'Home', href: '#home', icon: <RiSparklingFill className="mr-2" /> },
    { id: 2, name: 'About', href: '#about', 
      subLinks: [
        { name: 'Bio', href: '#bio' },
        { name: 'Experience', href: '#experience' },
        { name: 'Education', href: '#education' }
      ],
      icon: <FaGem className="mr-2" />
    },
    { id: 3, name: 'Skills', href: '#skills', icon: <RiSparklingFill className="mr-2" /> },
    { id: 4, name: 'Projects', href: '#projects', 
      subLinks: [
        { name: 'Web Apps', href: '#web' },
        { name: 'Mobile Apps', href: '#mobile' },
        { name: 'Open Source', href: '#opensource' }
      ],
      icon: <FaGem className="mr-2" />
    },
    { id: 5, name: 'Contact', href: '#contact', icon: <RiSparklingFill className="mr-2" /> },
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
      className={`fixed w-full h-24 flex justify-between items-center px-8 lg:px-16 text-gray-300 z-50 border-b border-gray-700/50`}
    >
      {/* Logo with advanced animation */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <motion.a 
          href="#home" 
          className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-pink-400 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <span className="flex items-center">
            <RiSparklingFill className="mr-2 text-pink-400" />
            DevPortfolio
            <RiSparklingFill className="ml-2 text-violet-400" />
          </span>
        </motion.a>
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500/0 via-pink-500 to-violet-500/0"
          animate={{ 
            backgroundPosition: nav ? '100% 50%' : '0% 50%',
            opacity: nav ? 0 : 1
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-2">
        {links.map(({ id, name, href, subLinks, icon }) => (
          <motion.li 
            key={id}
            className="relative px-4 py-2"
            onHoverStart={() => setHoveredItem(id)}
            onHoverEnd={() => setHoveredItem(null)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: id * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="relative">
              <a 
                href={href} 
                className={`flex items-center text-sm lg:text-base font-medium transition-all duration-500 group ${
                  activeLink === href ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setActiveLink(href)}
              >
                <motion.span 
                  className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: hoveredItem === id ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {icon}
                </motion.span>
                {name}
                {subLinks && (
                  <FaChevronDown className={`ml-1 text-xs transition-all duration-300 ${
                    hoveredItem === id ? 'rotate-180 text-pink-400' : 'text-gray-500'
                  }`} />
                )}
              </a>
              
              {/* Active link indicator */}
              {activeLink === href && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full"
                  layoutId="activeLink"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
            
            {/* Sublinks dropdown */}
            {subLinks && hoveredItem === id && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-full left-0 mt-2 w-56 bg-[#0a192f] rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden backdrop-blur-lg"
              >
                {subLinks.map((subLink, index) => (
                  <motion.a 
                    key={index}
                    href={subLink.href}
                    className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-300 flex items-center border-b border-gray-800/50 last:border-0"
                    whileHover={{ x: 5 }}
                  >
                    <RiSparklingFill className="mr-2 text-pink-400/80 text-xs" />
                    {subLink.name}
                    <FiExternalLink className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </motion.li>
        ))}
        
        {/* Premium CTA Button */}
        <motion.li
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-6 relative"
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-md"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
          <a 
            href="#contact" 
            className="relative px-8 py-3 bg-gradient-to-r from-pink-600 to-violet-600 rounded-full text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-500 flex items-center"
          >
            <RiSparklingFill className="mr-2 animate-pulse" />
            Hire Me
          </a>
        </motion.li>
      </ul>

      {/* Mobile Navigation Toggle */}
      <motion.div 
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-50 text-gray-300 md:hidden relative"
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
            <FaTimes size={30} className="relative text-pink-400" />
          </>
        ) : (
          <>
            <motion.div 
              className="absolute inset-0 bg-violet-500/10 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <FaBars size={30} className="relative" />
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
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setNav(false)}
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 w-4/5 max-w-md h-full bg-gradient-to-b from-[#0a192f] to-[#0d1b36] z-40 shadow-2xl border-l border-gray-700/50 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                  <a 
                    href="#home" 
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-400"
                    onClick={() => {
                      setNav(false);
                      setActiveLink('#home');
                    }}
                  >
                    DevPortfolio
                  </a>
                  <button 
                    onClick={() => setNav(false)}
                    className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
                  >
                    <FaTimes className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                
                {/* Navigation Links */}
                <ul className="flex-1 p-6 space-y-2">
                  {links.map(({ id, name, href, subLinks, icon }) => (
                    <motion.li 
                      key={id}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: id * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex flex-col">
                        <a 
                          href={href} 
                          className={`text-lg py-4 px-4 rounded-lg flex items-center ${
                            activeLink === href 
                              ? 'bg-gray-800/50 text-white' 
                              : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
                          } transition-all duration-300`}
                          onClick={() => {
                            setNav(false);
                            setActiveLink(href);
                          }}
                        >
                          <span className="mr-3">
                            {React.cloneElement(icon, {
                              className: `${icon.props.className} ${
                                activeLink === href ? 'text-pink-400' : 'text-gray-500'
                              }`
                            })}
                          </span>
                          {name}
                          {subLinks && (
                            <FaChevronDown className={`ml-auto transition-transform ${
                              hoveredItem === id ? 'rotate-180' : ''
                            }`} />
                          )}
                        </a>
                        
                        {subLinks && (
                          <motion.div 
                            className="pl-8 mt-1 space-y-1"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {subLinks.map((subLink, index) => (
                              <a 
                                key={index}
                                href={subLink.href}
                                className="block py-3 px-4 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-gray-800/20"
                                onClick={() => {
                                  setNav(false);
                                  setActiveLink(subLink.href);
                                }}
                              >
                                {subLink.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Footer with CTA */}
                <div className="p-6 border-t border-gray-700/50">
                  <motion.a
                    href="#contact"
                    className="block w-full py-4 text-center bg-gradient-to-r from-pink-600 to-violet-600 rounded-xl text-white font-semibold shadow-lg relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setNav(false);
                      setActiveLink('#contact');
                    }}
                  >
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-pink-400/30 to-violet-400/30 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    />
                    <span className="relative flex items-center justify-center">
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
