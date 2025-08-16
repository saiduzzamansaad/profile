import React, { useEffect, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useAnimation,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaDribbble,
  FaBehance,
  FaFigma,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiThreedotjs,
  SiAstro,
  SiPrisma,
} from "react-icons/si";
import premiumDeveloperImage from '../assets/premiumDeveloperImage.png';

const PremiumHero = () => {
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Optimized mobile detection with debounce
  useEffect(() => {
    let timeoutId = null;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(window.innerWidth < 1024), 100);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Floating animation with optimized performance
  useEffect(() => {
    const startAnimations = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });

      if (!isMobile) {
        controls.start({
          y: [0, -12, 0],
          transition: {
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        });
      }
    };

    startAnimations();
  }, [controls, isMobile]);

  // Memoized data arrays for better performance
  const socialLinks = useMemo(
    () => [
      {
        icon: <FaLinkedin className="text-lg" />,
        label: "LinkedIn",
        url: "#",
        color: "from-blue-600 to-blue-700",
        hoverColor: "hover:shadow-blue-500/30",
      },
      {
        icon: <FaGithub className="text-lg" />,
        label: "GitHub",
        url: "#",
        color: "from-gray-700 to-gray-900",
        hoverColor: "hover:shadow-gray-500/30",
      },
      {
        icon: <HiOutlineMail className="text-lg" />,
        label: "Email",
        url: "#",
        color: "from-red-500 to-red-600",
        hoverColor: "hover:shadow-red-500/30",
      },
      {
        icon: <FaDribbble className="text-lg" />,
        label: "Dribbble",
        url: "#",
        color: "from-pink-500 to-pink-600",
        hoverColor: "hover:shadow-pink-500/30",
      },
      {
        icon: <FaBehance className="text-lg" />,
        label: "Behance",
        url: "#",
        color: "from-blue-500 to-blue-600",
        hoverColor: "hover:shadow-blue-500/30",
      },
      {
        icon: <FaFigma className="text-lg" />,
        label: "Figma",
        url: "#",
        color: "from-purple-500 to-purple-600",
        hoverColor: "hover:shadow-purple-500/30",
      },
    ],
    []
  );

  const techStack = useMemo(
    () => [
      { 
        icon: <SiReact className="text-2xl text-cyan-400" />, 
        label: "React",
        tooltip: "React Specialist with 5+ years experience",
      },
      {
        icon: <SiTypescript className="text-2xl text-blue-500" />,
        label: "TypeScript",
        tooltip: "TypeScript Expert",
      },
      {
        icon: <SiNextdotjs className="text-2xl text-white" />,
        label: "Next.js",
        tooltip: "Next.js Certified Developer",
      },
      {
        icon: <SiAstro className="text-2xl text-orange-500" />,
        label: "Astro",
        tooltip: "Astro Early Adopter",
      },
      {
        icon: <SiTailwindcss className="text-2xl text-cyan-300" />,
        label: "Tailwind",
        tooltip: "Tailwind CSS Expert",
      },
      {
        icon: <SiNodedotjs className="text-2xl text-green-500" />,
        label: "Node.js",
        tooltip: "Node.js Backend Developer",
      },
      {
        icon: <SiThreedotjs className="text-2xl text-gray-200" />,
        label: "Three.js",
        tooltip: "3D Web Graphics Specialist",
      },
      {
        icon: <SiPrisma className="text-2xl text-emerald-400" />,
        label: "Prisma",
        tooltip: "Database ORM Expert",
      },
    ],
    []
  );

  // Animation variants with optimized values
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.15,
        when: "beforeChildren"
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
        damping: 12
      },
    },
  };

  // Generate random particles with memoization
  const particles = useMemo(() => {
    const count = isMobile ? 6 : 12;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 3,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['from-purple-500/10', 'from-pink-500/10', 'from-blue-500/10'][Math.floor(Math.random() * 3)]
    }));
  }, [isMobile]);

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Premium Grid Background with optimized rendering */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.12) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)
          `,
          backgroundSize: "50px 50px, 50px 50px, 100% 100%",
        }}
      />
      
      {/* Animated gradient overlay with optimized performance */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating particles with optimized animation */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-r ${particle.color} to-transparent`}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            opacity: particle.opacity,
          }}
          initial={{ scale: 0.5 }}
          animate={{
            scale: 1,
            x: [0, (Math.random() - 0.5) * 30],
            y: [0, (Math.random() - 0.5) * 30],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Main content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section with optimized animations */}
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge with pulse animation */}
            <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
              <div className="inline-flex items-center px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full mr-2 lg:mr-3"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                />
                <span className="text-purple-300 text-xs lg:text-sm font-medium tracking-wide">
                  Currently accepting new projects
                </span>
              </div>
            </motion.div>

            {/* Main Heading with enhanced typography */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 lg:mb-6 tracking-tight"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MD.SAIDUZZAMAN
              </span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
                animate={isHovering ? { 
                  backgroundPosition: "100% 100%",
                  transition: { duration: 1.2, ease: "linear" }
                } : {}}
                style={{
                  backgroundSize: "200% 200%",
                }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                SAAD
              </motion.span>
            </motion.h1>

            {/* Subtitle with decorative divider */}
            <motion.div variants={itemVariants} className="mb-6 lg:mb-8">
              <div className="w-16 lg:w-24 h-0.5 lg:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-4 lg:mb-6 rounded-full" />
              <p className="text-lg sm:text-xl lg:text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
                Senior Full-Stack Developer & UI/UX Specialist crafting immersive digital experiences with cutting-edge technologies.
              </p>
            </motion.div>

            {/* Experience Counter */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 lg:mb-10 text-base lg:text-lg flex items-center gap-2"
            >
              <span className="inline-block w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse"></span>
              5+ years building scalable applications for global clients
            </motion.p>

            {/* CTA Buttons with enhanced hover effects */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 mb-10 lg:mb-12"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 8px 20px -5px rgba(192, 132, 252, 0.4)"
                }}
                whileTap={{ scale: 0.97 }}
                className="group px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg lg:rounded-xl font-semibold flex items-center justify-center gap-2 lg:gap-3 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 text-sm lg:text-base">View Portfolio</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="relative z-10"
                >
                  <FaArrowRight className="text-sm lg:text-base" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: "rgba(126, 34, 206, 0.1)",
                  borderColor: "rgba(192, 132, 252, 0.5)"
                }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 lg:px-8 lg:py-4 bg-transparent text-white rounded-lg lg:rounded-xl font-semibold border border-gray-700 hover:bg-purple-500/10 transition-all duration-300 text-sm lg:text-base"
              >
                Download Resume
              </motion.button>
            </motion.div>

            {/* Tech Stack with tooltips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 lg:mb-10"
            >
              <p className="text-gray-400 text-xs lg:text-sm uppercase tracking-wider mb-3 lg:mb-4 font-medium">
                Tech Expertise
              </p>
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.6 + index * 0.08,
                      type: "spring",
                      stiffness: 400,
                      damping: 12
                    }}
                    whileHover={{
                      y: -4,
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      boxShadow: "0 5px 15px -5px rgba(0,0,0,0.3)"
                    }}
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-800/50 backdrop-blur-sm rounded-lg lg:rounded-xl flex items-center justify-center border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-default group relative"
                    title={tech.tooltip}
                  >
                    {tech.icon}
                    <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {tech.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-900 border-solid"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links with optimized hover effects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-2 lg:gap-3"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{
                    y: -4,
                    scale: 1.1,
                    boxShadow: "0 8px 20px -5px rgba(0,0,0,0.2)"
                  }}
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center text-white shadow-lg ${link.hoverColor} transition-all duration-300`}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section with optimized loading */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { 
                duration: 0.7, 
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1] 
              } 
            }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative max-w-md lg:max-w-lg mx-auto">
              {/* Main Image Container with loading state */}
              <motion.div
                animate={controls}
                className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl border border-gray-700/50"
                whileHover={{
                  scale: isMobile ? 1 : 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Developer image with optimized loading */}
                <motion.div 
                  className="aspect-[4/5] bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: isImageLoaded ? 1 : 0.7,
                    transition: { duration: 0.5 }
                  }}
                >
                  <img 
                    src={premiumDeveloperImage} 
                    alt="MD. Saifuzzaman Saad" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gray-800/50 animate-pulse"></div>
                  )}
                </motion.div>

                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
              </motion.div>

              {/* Floating Stats with optimized animations */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                className="absolute -top-4 -left-4 lg:-top-6 lg:-left-6 bg-white/95 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl shadow-md lg:shadow-lg border border-gray-200/50"
              >
                <div className="flex items-center gap-1 lg:gap-2">
                  <motion.div
                    className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                    }}
                  />
                  <span className="text-gray-800 text-xs lg:text-sm font-medium">
                    5+ Years Exp
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-gray-900/95 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl shadow-md lg:shadow-lg border border-gray-700/50"
              >
                <div className="text-center">
                  <p className="text-purple-400 text-sm lg:text-base font-bold">200+</p>
                  <p className="text-gray-300 text-xs lg:text-sm">Projects</p>
                </div>
              </motion.div>

              {/* Floating Elements (desktop only) */}
              {!isMobile && (
                <>
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-8 -right-8 w-20 h-20 border-2 border-purple-400/20 rounded-full pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -180, -360],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute bottom-8 -left-8 w-16 h-16 border-2 border-pink-400/20 rounded-square rotate-45 pointer-events-none"
                  />
                </>
              )}

              {/* Glow Effects with optimized rendering */}
              <div className="absolute -inset-1 lg:-inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl lg:rounded-2xl blur-xl opacity-10 -z-10" />
              <div className="absolute -inset-0.5 lg:-inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl lg:rounded-2xl blur-md opacity-5 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator (desktop only) */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-gray-400 text-xs tracking-wider">SCROLL DOWN</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumHero;
