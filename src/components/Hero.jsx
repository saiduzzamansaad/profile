import React, { useRef, useEffect, useState } from "react";
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
} from "react-icons/si";
import premiumDeveloperImage from "../assets/premiumDeveloperImage.png";

const PremiumHero = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    const animation = animate(count, 5, { duration: 2 });
    return animation.stop;
  }, []);

  // Text animation sequences
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      });

      // Floating animation for the image
      await controls.start({
        y: [0, -15, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      });
    };

    sequence();
  }, [controls]);

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-lg" />,
      label: "LinkedIn",
      url: "#",
      color: "bg-blue-700",
    },
    {
      icon: <FaGithub className="text-lg" />,
      label: "GitHub",
      url: "#",
      color: "bg-gray-900",
    },
    {
      icon: <HiOutlineMail className="text-lg" />,
      label: "Email",
      url: "#",
      color: "bg-red-600",
    },
    {
      icon: <FaDribbble className="text-lg" />,
      label: "Dribbble",
      url: "#",
      color: "bg-pink-600",
    },
    {
      icon: <FaBehance className="text-lg" />,
      label: "Behance",
      url: "#",
      color: "bg-blue-600",
    },
    {
      icon: <FaFigma className="text-lg" />,
      label: "Figma",
      url: "#",
      color: "bg-purple-600",
    },
  ];

  const techIcons = [
    { icon: <SiReact className="text-2xl text-cyan-500" />, label: "React" },
    {
      icon: <SiTypescript className="text-2xl text-blue-600" />,
      label: "TypeScript",
    },
    {
      icon: <SiNextdotjs className="text-2xl text-black dark:text-white" />,
      label: "Next.js",
    },
    {
      icon: <SiTailwindcss className="text-2xl text-cyan-400" />,
      label: "Tailwind CSS",
    },
    {
      icon: <SiNodedotjs className="text-2xl text-green-600" />,
      label: "Node.js",
    },
    {
      icon: <SiThreedotjs className="text-2xl text-gray-200" />,
      label: "Three.js",
    },
  ];

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center relative overflow-hidden">
      {/* Luxury background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Premium geometric pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(79, 70, 229, 0.1) 50%, transparent 50%),
              linear-gradient(-45deg, rgba(109, 40, 217, 0.1) 50%, transparent 50%)
            `,
            backgroundSize: "60px 60px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5 }}
        />

        {/* Floating light spots */}
        {[...Array(isMobile ? 3 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-indigo-600/10 to-violet-600/10 filter blur-xl`}
            initial={{
              width: `${
                Math.random() * (isMobile ? 100 : 200) + (isMobile ? 50 : 100)
              }px`,
              height: `${
                Math.random() * (isMobile ? 100 : 200) + (isMobile ? 50 : 100)
              }px`,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* Animated grid lines */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Content Section - order changes on mobile */}
          <motion.div
            className="order-2 lg:order-1 mt-8 lg:mt-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4 md:mb-6">
              <span className="text-indigo-400 font-medium tracking-wider uppercase text-xs sm:text-sm inline-flex items-center">
                <motion.span
                  className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mr-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                Senior Web Developer
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 md:mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    textShadow: "0 0 10px rgba(79, 70, 229, 0.5)",
                  }}
                  transition={{ delay: 0.4 }}
                >
                  MD.SAIDUZZAMAN
                </motion.span>
              </span>{" "}
              <motion.span
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                }}
                transition={{ delay: 0.6 }}
              >
                SAAD
              </motion.span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-6 md:mb-8">
              <motion.div
                className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mb-3 sm:mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
              <motion.p
                className="text-lg sm:text-xl text-gray-300 font-light max-w-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Crafting immersive digital experiences that blend aesthetics
                with functionality for global brands and startups.
              </motion.p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-6 md:mb-10 max-w-lg leading-relaxed font-light text-sm sm:text-base"
            >
              With over{" "}
              <motion.span
                className="text-indigo-400 font-medium"
                animate={{
                  textShadow: "0 0 8px rgba(79, 70, 229, 0.5)",
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2,
                }}
              >
                {rounded}
              </motion.span>{" "}
              years of experience, I specialize in creating premium digital
              products that drive engagement and deliver measurable results for
              clients worldwide.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-16"
            >
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg font-medium flex items-center gap-2 md:gap-3 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="relative z-10 text-sm md:text-base">
                  Explore Portfolio
                </span>
                <motion.span
                  className="relative z-10"
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <FaArrowRight className="text-sm md:text-base" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-transparent text-white rounded-lg font-medium border border-gray-600 hover:border-gray-400 shadow-sm hover:shadow-md transition-all group relative overflow-hidden text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <span className="relative z-10">Download CV</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mb-8 md:mb-12"
            >
              <motion.p
                className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-3 md:mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
              >
                Tech Stack
              </motion.p>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {techIcons.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1.6 + index * 0.15,
                      type: "spring",
                      stiffness: 300,
                    }}
                    whileHover={{
                      y: -5,
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 },
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                    title={tech.label}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="relative z-10"
                    >
                      {tech.icon}
                    </motion.div>
                    <motion.div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex flex-wrap gap-2 md:gap-3"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                    backgroundColor: link.color,
                    rotate: 360,
                    transition: { duration: 0.5 },
                  }}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-800 flex items-center justify-center shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                  aria-label={link.label}
                >
                  <motion.span
                    className="text-gray-300 group-hover:text-white transition-colors relative z-10 text-sm md:text-base"
                    whileHover={{ scale: 1.2 }}
                  >
                    {link.icon}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: link.color }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Premium Image Section with Advanced Animations */}
          {/* Premium Image Section with Futuristic 2025 Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 relative flex justify-center"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Futuristic holographic frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-br from-indigo-900/20 to-violet-900/20 rounded-2xl sm:rounded-3xl transform rotate-3 border border-indigo-400/30"
                style={{
                  boxShadow: "0 0 30px rgba(99, 102, 241, 0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Holographic grid pattern */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `
          linear-gradient(to right, rgba(165, 180, 252, 0.2) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(165, 180, 252, 0.2) 1px, transparent 1px)
        `,
                    backgroundSize: "20px 20px",
                  }}
                ></div>
              </motion.div>

              {/* Floating tech orb elements */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ delay: 0.8, duration: 8, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 blur-md"
              ></motion.div>

              {/* Main image container with advanced 3D effect */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.5 },
                }}
                className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl border border-gray-700/50"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                animate={controls}
              >
                {/* Futuristic image with dynamic lighting */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.8 },
                  }}
                  className="overflow-hidden relative"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <img
                    src={premiumDeveloperImage}
                    alt="MD. SAIDUZZAMAN SAAD"
                    className="w-full h-auto object-cover grayscale-[10%] contrast-110 brightness-110 hover:grayscale-0 hover:contrast-120 hover:brightness-125 transition-all duration-700"
                    style={{
                      transform: "translateZ(30px)",
                    }}
                  />

                  {/* Holographic overlay effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
                      mixBlendMode: "overlay",
                    }}
                  ></motion.div>

                  {/* Digital particle effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, rgba(255,255,255,0.8) 0.5px, transparent 0.5px)",
                      backgroundSize: "10px 10px",
                    }}
                  ></motion.div>
                </motion.div>

                {/* Futuristic experience badge with cyberpunk glow */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      "0 0 0 0 rgba(99, 102, 241, 0.7)",
                      "0 0 20px 5px rgba(99, 102, 241, 0.7)",
                    ],
                  }}
                  transition={{
                    delay: 1.4,
                    rotate: {
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 4,
                    },
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                  className="absolute -top-5 -left-5 bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 rounded-full shadow-xl flex items-center backdrop-blur-sm z-10 border border-indigo-300/30"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="w-3 h-3 bg-white rounded-full mr-2"
                  ></motion.div>
                  <span className="font-medium text-white text-sm tracking-wide">
                    8+ YEARS EXP
                  </span>
                </motion.div>

                {/* 2025 Futuristic client badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -15, 0],
                  }}
                  transition={{
                    delay: 1.6,
                    type: "spring",
                    stiffness: 300,
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    },
                  }}
                  className="absolute -bottom-5 -right-5 bg-white/95 px-5 py-2 rounded-xl shadow-xl flex items-center backdrop-blur-sm border border-gray-200/30 z-10"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 75%, 90% 100%, 0% 100%)",
                  }}
                >
                  <div className="flex -space-x-2 mr-3">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        initial={{ scale: 0 }}
                        animate={{
                          scale: 1,
                          y: [0, -8, 0],
                        }}
                        transition={{
                          delay: 1.8 + item * 0.1,
                          y: {
                            duration: 3 + item * 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                          },
                        }}
                        className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white"
                      ></motion.div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-mono">
                      CLIENTS 2025
                    </p>
                    <p className="font-bold text-gray-800 text-sm">50+</p>
                  </div>
                </motion.div>

                {/* Floating project counter with digital animation */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    boxShadow: [
                      "0 0 0 0 rgba(74, 222, 128, 0.7)",
                      "0 0 0 10px rgba(74, 222, 128, 0)",
                    ],
                    textShadow: [
                      "0 0 0 rgba(74, 222, 128, 0)",
                      "0 0 10px rgba(74, 222, 128, 0.7)",
                    ],
                  }}
                  transition={{
                    delay: 2,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                    textShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    },
                  }}
                  className="absolute -left-5 bottom-20 bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-700/50 z-10"
                  style={{
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 10% 100%)",
                  }}
                >
                  <div className="flex items-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="w-2 h-2 bg-green-400 rounded-full mr-2"
                    ></motion.div>
                    <span className="text-white text-sm font-mono tracking-wider">
                      120+ PROJECTS
                    </span>
                  </div>
                </motion.div>

                {/* Digital binary code animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.05 }}
                  transition={{ delay: 2.2 }}
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white font-mono text-xs"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0,
                      }}
                      animate={{
                        opacity: [0, 0.3, 0],
                        y: [
                          `${Math.random() * 50}%`,
                          `${Math.random() * 50 + 50}%`,
                        ],
                      }}
                      transition={{
                        duration: Math.random() * 10 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                      }}
                    >
                      {Math.random() > 0.5 ? "101010" : "010101"}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Animated corner elements with cyberpunk style */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 360,
                }}
                transition={{
                  delay: 1.2,
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-indigo-400 rounded-tr-xl"
                style={{
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.5)",
                }}
              ></motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: -360,
                }}
                transition={{
                  delay: 1.4,
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-violet-400 rounded-bl-xl"
                style={{
                  boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)",
                }}
              ></motion.div>

              {/* Floating tech orbs - futuristic concept */}
              {!isMobile &&
                [1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      y: [0, -40, 0],
                      x: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0],
                    }}
                    transition={{
                      delay: 1.5 + i * 0.3,
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    className={`absolute ${
                      i === 1
                        ? "top-8 -left-8 w-6 h-6"
                        : i === 2
                        ? "top-1/2 -right-10 w-8 h-8"
                        : i === 3
                        ? "bottom-20 -left-10 w-5 h-5"
                        : "bottom-8 -right-8 w-7 h-7"
                    } rounded-full`}
                    style={{
                      background:
                        i % 2 === 0
                          ? "radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0) 70%)"
                          : "radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(124,58,237,0) 70%)",
                      boxShadow:
                        i % 2 === 0
                          ? "0 0 20px 5px rgba(99,102,241,0.3)"
                          : "0 0 20px 5px rgba(124,58,237,0.3)",
                    }}
                  ></motion.div>
                ))}

              {/* 2025 Badge - Futuristic Concept */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  delay: 2.5,
                  rotate: {
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 5,
                  },
                }}
                className="absolute -bottom-6 right-1/4 bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-1 rounded-md shadow-lg z-20"
                style={{
                  clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                }}
              >
                <p className="text-white text-xs font-bold tracking-wider">
                  DESIGN 2025
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Luxury scroll indicator with enhanced animation - only on desktop */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-gray-400 text-sm mb-2 tracking-wider"
          >
            SCROLL DOWN
          </motion.div>
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <svg
              width="24"
              height="40"
              viewBox="0 0 24 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M12 1V10M12 39V30M12 10L7 5M12 10L17 5M12 30L7 35M12 30L17 35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  pathLength: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <motion.path
                d="M12 15V25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default PremiumHero;
