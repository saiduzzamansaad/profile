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

  // Optimized mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Floating animation
  useEffect(() => {
    const startAnimations = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      });

      controls.start({
        y: [0, -15, 0],
        transition: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      });
    };

    startAnimations();
  }, [controls]);

  // Memoized data arrays
  const socialLinks = useMemo(
    () => [
      {
        icon: <FaLinkedin className="text-lg" />,
        label: "LinkedIn",
        url: "#",
        color: "from-blue-600 to-blue-700",
      },
      {
        icon: <FaGithub className="text-lg" />,
        label: "GitHub",
        url: "#",
        color: "from-gray-700 to-gray-900",
      },
      {
        icon: <HiOutlineMail className="text-lg" />,
        label: "Email",
        url: "#",
        color: "from-red-500 to-red-600",
      },
      {
        icon: <FaDribbble className="text-lg" />,
        label: "Dribbble",
        url: "#",
        color: "from-pink-500 to-pink-600",
      },
      {
        icon: <FaBehance className="text-lg" />,
        label: "Behance",
        url: "#",
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: <FaFigma className="text-lg" />,
        label: "Figma",
        url: "#",
        color: "from-purple-500 to-purple-600",
      },
    ],
    []
  );

  const techStack = useMemo(
    () => [
      { icon: <SiReact className="text-2xl text-cyan-400" />, label: "React" },
      {
        icon: <SiTypescript className="text-2xl text-blue-500" />,
        label: "TypeScript",
      },
      {
        icon: <SiNextdotjs className="text-2xl text-white" />,
        label: "Next.js",
      },
      {
        icon: <SiAstro className="text-2xl text-orange-500" />,
        label: "Astro",
      },
      {
        icon: <SiTailwindcss className="text-2xl text-cyan-300" />,
        label: "Tailwind",
      },
      {
        icon: <SiNodedotjs className="text-2xl text-green-500" />,
        label: "Node.js",
      },
      {
        icon: <SiThreedotjs className="text-2xl text-gray-200" />,
        label: "Three.js",
      },
      {
        icon: <SiPrisma className="text-2xl text-emerald-400" />,
        label: "Prisma",
      },
    ],
    []
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        damping: 10
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#020617",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30"
        initial={{ backgroundPosition: "0% 0%" }}
        animate={{ backgroundPosition: "100% 100%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
        }}
      />

      {/* Floating particles */}
      {[...Array(isMobile ? 8 : 16)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 40],
            y: [0, (Math.random() - 0.5) * 40],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full mr-3"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="text-purple-300 text-sm font-medium tracking-wide">
                  Currently accepting new projects
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl font-bold leading-tight mb-6 tracking-tight"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MD.SAIDUZZAMAN
              </span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={isHovering ? { 
                  backgroundPosition: "100% 100%",
                  transition: { duration: 1.5, ease: "linear" }
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

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-6 rounded-full" />
              <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
                Senior Full-Stack Developer & UI/UX Specialist crafting immersive digital experiences with cutting-edge technologies.
              </p>
            </motion.div>

            {/* Experience Counter */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-10 text-lg flex items-center gap-2"
            >
              <span className="inline-block w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
              5+ years building scalable applications for global clients
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(192, 132, 252, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">View Portfolio</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="relative z-10"
                >
                  <FaArrowRight />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(126, 34, 206, 0.1)",
                  borderColor: "rgba(192, 132, 252, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border border-gray-700 hover:bg-purple-500/10 transition-all duration-300"
              >
                Download Resume
              </motion.button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-10"
            >
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-4 font-medium">
                Tech Expertise
              </p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.8 + index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 10
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                      boxShadow: "0 5px 15px -5px rgba(0,0,0,0.3)"
                    }}
                    className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 cursor-default"
                    title={tech.label}
                  >
                    {tech.icon}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    boxShadow: "0 8px 20px -5px rgba(0,0,0,0.2)"
                  }}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${link.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative max-w-lg mx-auto">
              {/* Main Image Container */}
              <motion.div
                animate={controls}
                className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Developer image with parallax effect */}
                <motion.div 
                  className="aspect-[4/5] bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.5 }
                  }}
                >
                  <img 
                    src={premiumDeveloperImage} 
                    alt="MD. Saifuzzaman Saad" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-200/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-800">
                    5+ Years Exp
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-6 -right-6 bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-700/50"
              >
                <div className="text-center">
                  <p className="text-purple-400 text-sm font-bold">200+</p>
                  <p className="text-gray-300 text-xs">Projects</p>
                </div>
              </motion.div>

              {/* Floating Elements */}
              {!isMobile && (
                <>
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-10 -right-10 w-24 h-24 border-2 border-purple-400/20 rounded-full pointer-events-none"
                  />
                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      rotate: [0, -180, -360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute bottom-10 -left-10 w-20 h-20 border-2 border-pink-400/20 rounded-square rotate-45 pointer-events-none"
                  />
                </>
              )}

              {/* Glow Effects */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-10 -z-10" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-md opacity-5 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gray-400 text-sm tracking-wider">SCROLL DOWN</span>
            <div className="w-0.5 h-10 bg-gradient-to-b from-purple-400 to-transparent rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PremiumHero;
