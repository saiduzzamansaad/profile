import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaGitAlt, FaFigma, FaDatabase, FaAws, FaSass,
  FaDocker, FaPython, FaJava, FaPhp, FaNpm, FaServer
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiMongodb, SiTypescript, SiNextdotjs, 
  SiGraphql, SiJest, SiRedux, SiExpress, SiPostgresql,
  SiFirebase, SiVercel, SiNetlify, SiJquery, SiWebpack,
  SiBootstrap, SiStorybook, SiCypress, SiGreensock
} from 'react-icons/si';
import { TbBrandReactNative, TbBrandThreejs } from 'react-icons/tb';
import { GiArtificialIntelligence, GiSpiderWeb } from 'react-icons/gi';
import { IoLogoVue, IoLogoIonic } from 'react-icons/io5';
import { BiCloud, BiCodeAlt } from 'react-icons/bi';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  const orbRefs = useRef([]);
  const skillRefs = useRef([]);

  // Performance optimization: Memoize all data
  const { skillsCategories } = useMemo(() => ({
    skillsCategories: [
      {
        title: "Frontend",
        icon: <GiSpiderWeb className="text-2xl" />,
        color: "from-indigo-500 to-purple-600",
        skills: [
          { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26', proficiency: 95 },
          { name: 'CSS3', icon: <FaCss3Alt />, color: '#2965F1', proficiency: 90 },
          { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E', proficiency: 92 },
          { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', proficiency: 88 },
          { name: 'React', icon: <FaReact />, color: '#61DAFB', proficiency: 94 },
          { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000', proficiency: 85 },
          { name: 'Vue.js', icon: <IoLogoVue />, color: '#4FC08D', proficiency: 80 },
          { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38B2AC', proficiency: 93 },
          { name: 'Redux', icon: <SiRedux />, color: '#764ABC', proficiency: 87 },
          { name: 'GSAP', icon: <SiGreensock />, color: '#88CE02', proficiency: 82 }
        ]
      },
      {
        title: "Backend",
        icon: <FaServer className="text-2xl" />,
        color: "from-amber-500 to-red-600",
        skills: [
          { name: 'Node.js', icon: <FaNodeJs />, color: '#68A063', proficiency: 90 },
          { name: 'Express', icon: <SiExpress />, color: '#000000', proficiency: 88 },
          { name: 'Python', icon: <FaPython />, color: '#3776AB', proficiency: 85 },
          { name: 'GraphQL', icon: <SiGraphql />, color: '#E535AB', proficiency: 83 },
          { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791', proficiency: 86 },
          { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', proficiency: 84 },
          { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28', proficiency: 82 },
          { name: 'REST API', icon: <BiCodeAlt />, color: '#4ADE80', proficiency: 91 }
        ]
      },
      {
        title: "DevOps & More",
        icon: <BiCloud className="text-2xl" />,
        color: "from-emerald-500 to-cyan-600",
        skills: [
          { name: 'Git', icon: <FaGitAlt />, color: '#F05032', proficiency: 93 },
          { name: 'Docker', icon: <FaDocker />, color: '#2496ED', proficiency: 80 },
          { name: 'AWS', icon: <FaAws />, color: '#FF9900', proficiency: 78 },
          { name: 'CI/CD', icon: <FaServer />, color: '#60A5FA', proficiency: 82 },
          { name: 'Three.js', icon: <TbBrandThreejs />, color: '#049EF4', proficiency: 75 },
          { name: 'React Native', icon: <TbBrandReactNative />, color: '#61DAFB', proficiency: 79 },
          { name: 'Jest', icon: <SiJest />, color: '#C21325', proficiency: 85 },
          { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9', proficiency: 77 }
        ]
      }
    ]
  }), []);

  // Track cursor position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Floating orbs animation with parallax effect
  useEffect(() => {
    if (!isInView) return;

    const animateOrbs = () => {
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        
        const duration = 15 + Math.random() * 10;
        const delay = i * 0.5;
        const y = 10 + Math.random() * 20;
        const x = (Math.random() - 0.5) * 40;
        
        orb.style.setProperty('--duration', `${duration}s`);
        orb.style.setProperty('--delay', `${delay}s`);
        orb.style.setProperty('--y', `${y}px`);
        orb.style.setProperty('--x', `${x}px`);
        
        // Add parallax effect
        orb.style.transform = `translate(
          calc(var(--x) + ${cursorPosition.x * 20}px), 
          calc(var(--y) + ${cursorPosition.y * 20}px)
        )`;
      });
    };

    animateOrbs();
  }, [isInView, cursorPosition]);

  // Skill hover glow effect
  useEffect(() => {
    skillRefs.current.forEach((skillEl, i) => {
      if (!skillEl) return;
      
      if (hoveredSkill && skillEl.dataset.skill === hoveredSkill.name) {
        skillEl.style.boxShadow = `0 0 25px ${hoveredSkill.color}80`;
        skillEl.style.transform = 'translateY(-8px)';
      } else {
        skillEl.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        skillEl.style.transform = 'translateY(0)';
      }
    });
  }, [hoveredSkill]);

  // Check for mobile viewport (debounced for performance)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    const handleResize = () => {
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animation sequences
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants (optimized for performance)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const skillHoverVariants = {
    initial: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { 
        duration: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const floatingOrbVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 0.2,
      transition: {
        delay: i * 0.3,
        duration: 1.5
      }
    })
  };

  // Floating orb components with Framer Motion
  const FloatingOrbs = () => (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          ref={el => orbRefs.current[i] = el}
          custom={i}
          variants={floatingOrbVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            background: `radial-gradient(circle, rgba(${
              Math.random() > 0.5 ? '236,72,153' : '124,58,237'
            }, ${0.3 + Math.random() * 0.4}) 0%, transparent 70%)`,
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(12px)',
            willChange: 'transform'
          }}
        />
      ))}
    </>
  );

  // Skill proficiency bar
  const ProficiencyBar = ({ proficiency }) => (
    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
      <motion.div 
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${proficiency}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ backgroundColor: hoveredSkill?.color || '#6366F1' }}
      />
    </div>
  );

  return (
    <section 
      className="relative overflow-hidden py-16 md:py-24 min-h-screen"
      id="skills" 
      ref={ref}
      style={{ background: 'radial-gradient(circle at center, #020617 0%, #0F172A 100%)' }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dynamic Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.1) 1px, transparent 1px),
              radial-gradient(circle at 50% 60%, rgba(236,72,153,0.1) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
            `,
            backgroundSize: "60px 60px, 60px 60px, 100% 100%",
          }}
        />
        
        {/* Floating orbs with animation */}
        <FloatingOrbs />
        
        {/* Animated grid lines */}
        <motion.div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : {}}
          transition={{ duration: 1.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated header with 3D text effect */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
          } : {}}
          transition={{ 
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 mb-4">
            <span className="inline-block hover:scale-105 transition-transform duration-300">
              Technical Expertise
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: "easeOut"
            }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Mastery of modern technologies for crafting exceptional digital experiences
          </motion.p>
        </motion.div>

        {/* Mobile category selector with smooth animation */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mb-6 flex overflow-x-auto pb-2 hide-scrollbar"
          >
            {skillsCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full whitespace-nowrap mr-3 text-sm font-medium ${
                  activeCategory === index 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Desktop category tabs */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/10">
              {skillsCategories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-6 py-2 rounded-full text-sm font-medium flex items-center transition-all ${
                    activeCategory === index 
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Animated skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {(!isMobile || activeCategory === activeCategory) && (
              <motion.div
                variants={categoryVariants}
                initial="hidden"
                animate={controls}
                className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl overflow-hidden relative`}
                style={{
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Animated background highlight */}
                <motion.div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.2 } : {}}
                  transition={{ duration: 1 }}
                  style={{
                    background: `radial-gradient(circle at 80% 20%, ${skillsCategories[activeCategory].skills[0].color}40, transparent 70%)`
                  }}
                />
                
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mr-4 backdrop-blur-sm"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {skillsCategories[activeCategory].icon}
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-white"
                    whileHover={{ x: 5 }}
                  >
                    {skillsCategories[activeCategory].title}
                  </motion.h3>
                </div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={controls}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                >
                  {skillsCategories[activeCategory].skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      ref={el => skillRefs.current[skillIndex] = el}
                      data-skill={skill.name}
                      variants={skillHoverVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="flex flex-col items-center p-5 bg-gradient-to-b from-white/5 to-white/10 rounded-xl border border-white/10 cursor-pointer relative overflow-hidden group transition-all duration-300"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      {/* Skill hover effect */}
                      <motion.div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`,
                        }}
                      />
                      
                      {/* Skill icon with floating animation */}
                      <motion.div 
                        className="text-4xl mb-4 transition-all duration-300 group-hover:scale-110 relative z-10"
                        style={{ color: skill.color }}
                        animate={{
                          y: [0, -5, 0],
                          transition: {
                            duration: 3 + skillIndex * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        {skill.icon}
                      </motion.div>
                      
                      <h3 className="font-medium text-white text-sm md:text-base text-center z-10 mb-1">
                        {skill.name}
                      </h3>
                      
                      {/* Proficiency indicator */}
                      <div className="w-full z-10">
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>Proficiency</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <ProficiencyBar proficiency={skill.proficiency} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Skill spotlight (appears when hovering a skill) */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md rounded-xl px-6 py-3 shadow-xl border border-white/10 z-20"
              style={{
                boxShadow: `0 10px 30px ${hoveredSkill.color}40`
              }}
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3" style={{ color: hoveredSkill.color }}>
                  {hoveredSkill.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white">{hoveredSkill.name}</h4>
                  <p className="text-sm text-white/80">Expertise level: {hoveredSkill.proficiency}%</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(Skills);
