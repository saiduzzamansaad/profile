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
  SiBootstrap, SiStorybook, SiCypress, 
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
  
  const orbRefs = useRef([]);

  // Performance optimization: Memoize all data
  const { testimonials, skillsCategories } = useMemo(() => ({
    
    skillsCategories: [
      {
        title: "Frontend",
        icon: <GiSpiderWeb className="text-2xl" />,
        skills: [
          { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
          { name: 'CSS3', icon: <FaCss3Alt />, color: '#2965F1' },
          { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
          { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
          { name: 'React', icon: <FaReact />, color: '#61DAFB' },
          { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
          { name: 'Vue.js', icon: <IoLogoVue />, color: '#4FC08D' },
          { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38B2AC' }
        ]
      },
      {
        title: "Backend",
        icon: <FaServer className="text-2xl" />,
        skills: [
          { name: 'Node.js', icon: <FaNodeJs />, color: '#68A063' },
          { name: 'Express', icon: <SiExpress />, color: '#000000' },
          { name: 'Python', icon: <FaPython />, color: '#3776AB' },
          { name: 'GraphQL', icon: <SiGraphql />, color: '#E535AB' },
          { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
          { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        ]
      },
      {
        title: "DevOps & More",
        icon: <BiCloud className="text-2xl" />,
        skills: [
          { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
          { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
          { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
          { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
          { name: 'Three.js', icon: <TbBrandThreejs />, color: '#049EF4' },
          { name: 'React Native', icon: <TbBrandReactNative />, color: '#61DAFB' },
        ]
      }
    ]
  }), []);

  // Floating orbs animation
  useEffect(() => {
    if (!isInView) return;

    const animateOrbs = () => {
      orbRefs.current.forEach((orb, i) => {
        const duration = 15 + Math.random() * 10;
        const delay = i * 0.5;
        const y = 10 + Math.random() * 20;
        
        orb.style.setProperty('--duration', `${duration}s`);
        orb.style.setProperty('--delay', `${delay}s`);
        orb.style.setProperty('--y', `${y}px`);
        
        
      });
    };

    animateOrbs();
  }, [isInView]);

  // Check for mobile viewport (debounced for performance)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Debounced resize handler
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

  

  // Floating orb components
  const FloatingOrbs = () => (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          ref={el => orbRefs.current[i] = el}
          className="absolute rounded-full opacity-20 pointer-events-none"
          style={{
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            background: `radial-gradient(circle, rgba(${
              Math.random() > 0.5 ? '236,72,153' : '124,58,237'
            }, ${0.3 + Math.random() * 0.4}) 0%, transparent 70%)`,
            top: `${10 + Math.random() * 80}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(8px)',
            willChange: 'transform'
          }}
        />
      ))}
    </>
  );

  return (
    <section 
      className="relative overflow-hidden py-16 md:py-24 min-h-screen"
      id="skills" 
      ref={ref}
      style={{ background: '#020617' }}
    >
      {/* Premium 2025 Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Magenta Orb Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
              radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
            `,
            backgroundSize: "40px 40px, 40px 40px, 100% 100%",
          }}
        />
        
        {/* Floating orbs */}
        <FloatingOrbs />
        
        {/* Animated grid lines */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : {}}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated header with 3D text effect */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              textShadow: '0 5px 15px rgba(124, 58, 237, 0.3)'
            } : {}}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            Technical Expertise
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              textShadow: '0 2px 10px rgba(236, 72, 153, 0.2)'
            } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: "easeOut"
            }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Cutting-edge technologies for immersive digital experiences
          </motion.p>
        </div>

        {/* Mobile category selector */}
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
                className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 text-sm ${
                  activeCategory === index 
                    ? 'bg-white text-gray-900 font-medium shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {category.title}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Optimized skills grid with advanced animations */}
        <div className="space-y-8">
          {skillsCategories.map((category, index) => (
            (!isMobile || activeCategory === index) && (
              <motion.div
                key={index}
                variants={categoryVariants}
                initial="hidden"
                animate={controls}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-2xl"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3"
                    whileHover={{ rotate: 10 }}
                  >
                    {category.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold text-white"
                    whileHover={{ x: 5 }}
                  >
                    {category.title}
                  </motion.h3>
                </div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={controls}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={skillHoverVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="flex flex-col items-center p-5 bg-gradient-to-b from-white/5 to-white/10 rounded-xl border border-white/10 cursor-pointer relative overflow-hidden group"
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Skill hover effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100"
                        style={{
                          background: `linear-gradient(135deg, ${skill.color}20 0%, transparent 70%)`,
                          transition: 'opacity 0.3s ease'
                        }}
                      />
                      
                      <div 
                        className="text-4xl mb-4 transition-all duration-300 group-hover:scale-110"
                        style={{ color: skill.color }}
                      >
                        {skill.icon}
                      </div>
                      <h3 className="font-medium text-white text-sm text-center z-10">
                        {skill.name}
                      </h3>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          ))}
        </div>

        
       
      </div>
    </section>
  );
};

export default React.memo(Skills);
