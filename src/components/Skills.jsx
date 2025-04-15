import React, { useRef, useEffect, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const controls = useAnimation();
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [bgColor, setBgColor] = useState('#000000');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CTO at TechCorp",
      content: "John delivered exceptional results on our project, with clean code and great attention to detail. His React expertise helped us build a performant frontend that scaled beautifully.",
      tags: ['React', 'TypeScript', 'Performance', 'Scalability'],
      emoji: "👨‍💻"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager at StartupX",
      content: "The full-stack solution John built scaled perfectly with our growing user base. His Node.js backend architecture was particularly impressive, handling 10K+ requests per second.",
      tags: ['Node.js', 'Scalability', 'Database', 'Architecture'],
      emoji: "👩‍💼"
    },
    {
      id: 3,
      name: "David Wilson",
      role: "Lead Developer at DigitalAgency",
      content: "Working with John was a pleasure. His ability to quickly understand complex requirements and translate them into elegant solutions is remarkable. The Vue.js application he built exceeded our expectations.",
      tags: ['Vue.js', 'Problem Solving', 'Communication', 'UI/UX'],
      emoji: "👨‍🔬"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      role: "CEO at TechStart",
      content: "John's expertise in both frontend and backend development saved us months of development time. His full-stack approach and clean code practices set a high standard for our team.",
      tags: ['Full-stack', 'Efficiency', 'Mentoring', 'Best Practices'],
      emoji: "👩‍💻"
    },
    {
      id: 5,
      name: "Robert Kim",
      role: "Director of Engineering at ScaleUp",
      content: "The DevOps pipeline John implemented reduced our deployment times by 80%. His knowledge of CI/CD and cloud infrastructure transformed our development workflow.",
      tags: ['DevOps', 'CI/CD', 'AWS', 'Automation'],
      emoji: "🧑‍🚀"
    }
  ];

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dynamic background color change - subtle variations of black
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      const variations = [
        '#000000', // pure black
        '#0a0a0a', // slightly lighter
        '#050505', // very dark
        '#101010'  // dark gray
      ];
      const randomColor = variations[Math.floor(Math.random() * variations.length)];
      setBgColor(randomColor);
    }, 10000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Testimonial slider auto-rotation
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isInView]);

  const skillsCategories = [
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
        { name: 'Vue', icon: <IoLogoVue />, color: '#4FC08D' },
        { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
        { name: 'React Native', icon: <TbBrandReactNative />, color: '#61DAFB' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38BDF8' },
        { name: 'Bootstrap', icon: <SiBootstrap />, color: '#7952B3' },
        { name: 'jQuery', icon: <SiJquery />, color: '#0769AD' },
      ]
    },
    {
      title: "Backend",
      icon: <FaServer className="text-2xl" />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, color: '#68A063' },
        { name: 'Express', icon: <SiExpress />, color: '#000000' },
        { name: 'Python', icon: <FaPython />, color: '#3776AB' },
        { name: 'Java', icon: <FaJava />, color: '#007396' },
        { name: 'PHP', icon: <FaPhp />, color: '#777BB4' },
        { name: 'GraphQL', icon: <SiGraphql />, color: '#E535AB' },
      ]
    },
    {
      title: "Database",
      icon: <FaDatabase className="text-2xl" />,
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
        { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
        { name: 'MySQL', icon: <FaDatabase />, color: '#4479A1' },
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: <BiCloud className="text-2xl" />,
      skills: [
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Vercel', icon: <SiVercel />, color: '#000000' },
        { name: 'Netlify', icon: <SiNetlify />, color: '#00C7B7' },
        { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9' },
      ]
    },
    {
      title: "Testing & Design",
      icon: <BiCodeAlt className="text-2xl" />,
      skills: [
        { name: 'Jest', icon: <SiJest />, color: '#C21325' },
        { name: 'Cypress', icon: <SiCypress />, color: '#17202C' },
        { name: 'Storybook', icon: <SiStorybook />, color: '#FF4785' },
        { name: 'Figma', icon: <FaFigma />, color: '#A259FF' },
      ]
    },
    {
      title: "Emerging Tech",
      icon: <GiArtificialIntelligence className="text-2xl" />,
      skills: [
        { name: 'Sass', icon: <FaSass />, color: '#CC6699' },
        { name: 'AI/ML', icon: <GiArtificialIntelligence />, color: '#FF6B6B' },
        { name: 'NPM', icon: <FaNpm />, color: '#CB3837' },
        { name: 'Three.js', icon: <TbBrandThreejs />, color: '#049EF4' },
      ]
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        mass: 0.5
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [0, -20, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const skillHover = {
    scale: 1.08,
    y: -8,
    boxShadow: '0 15px 30px -10px rgba(0,0,0,0.2)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15
    }
  };

  const skillTap = {
    scale: 0.95,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 20
    }
  };

  const categoryHover = {
    y: -5,
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
    transition: { duration: 0.3 }
  };

  const skillDetailVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: { opacity: 0, y: -20 }
  };

  const testimonialVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setCurrentTestimonial((prev) => {
      const nextIndex = prev + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  };

  return (
    <section 
      className="py-20 md:py-32 relative overflow-hidden" 
      id="skills" 
      ref={ref}
      style={{
        backgroundColor: bgColor,
        transition: 'background-color 3s ease'
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-1 pointer-events-none" />

      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Animated header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="inline-block"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 mb-4"
              style={{
                textShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear'
              }}
            >
              Technical Expertise
            </motion.h2>
            <motion.div 
              className="h-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: '150px' } : {}}
              transition={{ delay: 0.4, duration: 1, ease: 'easeInOut' }}
            />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mt-6"
          >
            Cutting-edge technologies and frameworks for building immersive digital experiences
          </motion.p>
        </div>

        {/* Category selector for mobile */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mb-8 flex overflow-x-auto pb-4 hide-scrollbar"
          >
            {skillsCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-2 rounded-full whitespace-nowrap mr-3 text-sm font-medium transition-colors ${
                  activeCategory === index 
                    ? 'bg-white text-indigo-900 shadow-lg' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {category.title}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Skills Categories with enhanced animations */}
        <div className="space-y-10">
          {skillsCategories.map((category, index) => (
            (!isMobile || activeCategory === index) && (
              <motion.div
                key={index}
                variants={categoryVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: 0.2 + index * 0.15 }}
                whileHover={categoryHover}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-white flex items-center">
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mr-3"
                      style={{ color: category.skills[0].color }}
                      animate={{
                        rotate: [0, 10, -10, 0],
                        transition: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    {category.title}
                  </h3>
                  <motion.span 
                    className="text-xs px-3 py-1 rounded-full bg-white/10 text-white"
                    animate={{
                      scale: [1, 1.05, 1],
                      transition: {
                        duration: 3,
                        repeat: Infinity
                      }
                    }}
                  >
                    {category.skills.length} technologies
                  </motion.span>
                </div>
                
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={item}
                      whileHover={skillHover}
                      whileTap={skillTap}
                      onHoverStart={() => setHoveredSkill(skill)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="flex flex-col items-center p-5 bg-gradient-to-br from-white/5 to-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer relative overflow-hidden"
                      style={{
                        boxShadow: `inset 0 1px 0 0 rgba(255,255,255,0.05)`
                      }}
                    >
                      {/* Skill glow effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: `radial-gradient(circle at center, ${skill.color}30, transparent 70%)`,
                          opacity: 0
                        }}
                        animate={{
                          opacity: hoveredSkill === skill ? 0.3 : 0,
                          transition: { duration: 0.3 }
                        }}
                      />
                      
                      <motion.div 
                        className="text-4xl md:text-5xl mb-4 transition-transform duration-300 z-10"
                        style={{ color: skill.color }}
                        animate={{
                          y: [0, -5, 0],
                          transition: {
                            duration: 4 + skillIndex,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        {skill.icon}
                      </motion.div>
                      <h3 className="font-medium text-white text-sm md:text-base text-center z-10">{skill.name}</h3>
                      <motion.div 
                        className="w-full h-1 mt-3 rounded-full opacity-70 z-10"
                        style={{ backgroundColor: skill.color }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3 + skillIndex * 0.05 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )
          ))}
        </div>

        {/* Skill detail panel */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              variants={skillDetailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-white/10 z-50 max-w-md w-full"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="text-4xl mr-4"
                  style={{ color: hoveredSkill.color }}
                >
                  {hoveredSkill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{hoveredSkill.name}</h3>
                  <div className="w-full h-1 rounded-full mt-2" style={{ backgroundColor: hoveredSkill.color }} />
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                {hoveredSkill.description || `Professional experience with ${hoveredSkill.name} in production environments.`}
              </p>
              <button 
                onClick={() => setHoveredSkill(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials slider with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 md:mt-32 relative h-[400px] md:h-[350px]"
        >
          <AnimatePresence custom={1} initial={false}>
            <motion.div
              key={currentTestimonial}
              custom={1}
              variants={testimonialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl border border-white/10 overflow-hidden"
            >
              {/* Floating background elements */}
              <motion.div 
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/10"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/10"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl mr-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {testimonials[currentTestimonial].emoji}
                  </motion.div>
                  <div>
                    <p className="font-bold text-xl">{testimonials[currentTestimonial].name}</p>
                    <p className="text-indigo-100">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                
                <motion.blockquote 
                  className="text-lg md:text-xl italic mb-6 relative flex-grow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="absolute -left-6 -top-4 text-5xl opacity-20">"</span>
                  {testimonials[currentTestimonial].content}
                  <span className="absolute -right-6 -bottom-4 text-5xl opacity-20">"</span>
                </motion.blockquote>
                
                <div className="flex flex-wrap gap-2">
                  {testimonials[currentTestimonial].tags.map((tag, i) => (
                    <motion.span 
                      key={i}
                      className="px-4 py-1.5 bg-white/10 rounded-full text-sm backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <button 
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-white hover:bg-black/50 transition-all"
            aria-label="Previous testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur flex items-center justify-center text-white hover:bg-black/50 transition-all"
            aria-label="Next testimonial"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentTestimonial ? 'bg-white w-6' : 'bg-white/30'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating tech badges */}
        <motion.div 
          className="hidden md:flex flex-wrap justify-center gap-6 mt-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.8 }}
        >
          {['Web Development', 'Mobile Apps', 'UI/UX Design', 'DevOps', 'Cloud Architecture', 'AI Integration'].map((badge, i) => (
            <motion.div
              key={i}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-full border border-white/10 backdrop-blur-sm"
              whileHover={{ 
                y: -5,
                background: ['linear-gradient(90deg, rgba(99,102,241,0.2) 0%, rgba(236,72,153,0.2) 100%)', 'linear-gradient(90deg, rgba(99,102,241,0.3) 0%, rgba(236,72,153,0.3) 100%)'],
                transition: { duration: 0.3 }
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <span className="text-white font-medium">{badge}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
