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
} from "react-icons/si";
import premiumDeveloperImage from '../assets/premiumDeveloperImage.png'

const PremiumHero = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Optimized mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Optimized counter animation
  useEffect(() => {
    const animation = animate(count, 8, { duration: 2.5, delay: 1 });
    return animation.stop;
  }, [count]);

  // Optimized floating animation
  useEffect(() => {
    const startAnimations = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
      });

      controls.start({
        y: [0, -20, 0],
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
        icon: <FaLinkedin />,
        label: "LinkedIn",
        url: "#",
        color: "from-blue-600 to-blue-700",
      },
      {
        icon: <FaGithub />,
        label: "GitHub",
        url: "#",
        color: "from-gray-700 to-gray-900",
      },
      {
        icon: <HiOutlineMail />,
        label: "Email",
        url: "#",
        color: "from-red-500 to-red-600",
      },
      {
        icon: <FaDribbble />,
        label: "Dribbble",
        url: "#",
        color: "from-pink-500 to-pink-600",
      },
      {
        icon: <FaBehance />,
        label: "Behance",
        url: "#",
        color: "from-blue-500 to-blue-600",
      },
      {
        icon: <FaFigma />,
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(120, 113, 255, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 113, 206, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(113, 255, 193, 0.12) 0%, transparent 50%)
            `,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Floating particles */}
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-xl"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-6">
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
                  Available for Projects
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                MD.SAIDUZZAMAN
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SAAD
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mb-4" />
              <p className="text-xl sm:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
                Senior Full-Stack Developer crafting exceptional digital
                experiences that blend innovation with functionality.
              </p>
            </motion.div>

            {/* Experience Counter */}
            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 text-lg"
            >
              <span className="text-purple-400 font-semibold text-2xl">
                {rounded.get()}+
              </span>
              years of experience building scalable applications for global
              clients.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                <span>View Portfolio</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <FaArrowRight />
                </motion.div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent text-white rounded-xl font-semibold border border-gray-600 hover:border-purple-400 hover:bg-purple-500/10 transition-all duration-300"
              >
                Download Resume
              </motion.button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mb-8"
            >
              <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      rotate: [0, 5, -5, 0],
                    }}
                    className="w-12 h-12 bg-gray-800/50 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
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
              transition={{ delay: 1.8 }}
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
                  transition={{ delay: 1.8 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    scale: 1.1,
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
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Placeholder for developer image */}
                <div className="aspect-[4/5] bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                  <div className="text-center">
                    <img src={premiumDeveloperImage} alt="" srcset="" />
                  </div>
                </div>

                {/* Holographic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-200/50"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-gray-800">
                    5+ Years
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="absolute -bottom-6 -right-6 bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-700/50"
              >
                <div className="text-center">
                  <p className="text-purple-400 text-sm font-bold">150+</p>
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
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute top-10 -right-10 w-20 h-20 border-2 border-purple-400/30 rounded-full"
                  />
                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      rotate: [0, -180, -360],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute bottom-10 -left-10 w-16 h-16 border-2 border-pink-400/30 rounded-square rotate-45"
                  />
                </>
              )}

              {/* Glow Effects */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 -z-10" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-gray-400 text-sm tracking-wider">SCROLL</span>
            <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default PremiumHero;
