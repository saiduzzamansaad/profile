import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Performance optimized motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  // Memoized tech stack data
  const techStack = useMemo(() => [
    { name: 'React', color: 'text-cyan-300', bg: 'bg-cyan-900/30', border: 'border-cyan-500/20' },
    { name: 'Next.js', color: 'text-gray-100', bg: 'bg-gray-800/30', border: 'border-gray-600/20' },
    { name: 'TypeScript', color: 'text-blue-300', bg: 'bg-blue-900/30', border: 'border-blue-500/20' },
    { name: 'Node.js', color: 'text-green-300', bg: 'bg-green-900/30', border: 'border-green-500/20' },
    { name: 'GraphQL', color: 'text-pink-300', bg: 'bg-pink-900/30', border: 'border-pink-500/20' },
    { name: 'MongoDB', color: 'text-emerald-300', bg: 'bg-emerald-900/30', border: 'border-emerald-500/20' },
    { name: 'Tailwind', color: 'text-sky-300', bg: 'bg-sky-900/30', border: 'border-sky-500/20' },
    { name: 'AWS', color: 'text-amber-300', bg: 'bg-amber-900/30', border: 'border-amber-500/20' },
    { name: 'Docker', color: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-500/20' },
    { name: 'Kubernetes', color: 'text-indigo-300', bg: 'bg-indigo-900/30', border: 'border-indigo-500/20' },
    { name: 'PostgreSQL', color: 'text-violet-300', bg: 'bg-violet-900/30', border: 'border-violet-500/20' },
    { name: 'Redis', color: 'text-red-300', bg: 'bg-red-900/30', border: 'border-red-500/20' },
  ], []);

  // Memoized stats data
  const stats = useMemo(() => [
    { icon: '👨‍💻', label: '5+ Years Exp', highlight: 'text-indigo-300' },
    { icon: '🚀', label: '120+ Projects', highlight: 'text-blue-300' },
    { icon: '🌐', label: 'Global Clients', highlight: 'text-cyan-300' },
    { icon: '📱', label: 'Mobile First', highlight: 'text-purple-300' },
    { icon: '⚡', label: 'High Performance', highlight: 'text-green-300' },
    { icon: '🔒', label: 'Secure Code', highlight: 'text-pink-300' },
    { icon: '🧠', label: 'AI Integration', highlight: 'text-amber-300' },
    { icon: '📈', label: 'Scalable Solutions', highlight: 'text-emerald-300' }
  ], []);

  // Optimized animations
  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Performance optimized handlers
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Animation triggers
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 }
      });
    }
  }, [controls, inView]);

  return (
    <section 
      id="about" 
      ref={ref}
      className="min-h-screen w-full bg-[#020617] relative overflow-hidden"
    >
      {/* 2025 Background Elements - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Modern grid background with reduced complexity */}
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
        
        
        {/* Reduced number of floating elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-700/10 to-purple-700/10 blur-[80px]"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-blue-700/10 to-teal-700/10 blur-[90px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col justify-center h-full relative z-10">
        {/* Section Header - Simplified */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pb-14 md:pb-20 text-center"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 bg-gradient-to-r from-indigo-500/50 via-violet-500/50 to-purple-500/50 mt-6 w-32 md:w-48 mx-auto"
          />
        </motion.div>

        {/* Content Grid - Optimized */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Simplified decorative elements */}
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-indigo-600/15 to-violet-600/15 rounded-2xl transform rotate-1 blur-lg" />

            {/* Main card with reduced effects */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              }}
              className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-100 leading-tight"
              >
                <p>Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">MD. SAIDUZZAMAN</span></p>
                <p className="mt-3 md:mt-4 text-lg sm:text-xl md:text-2xl text-gray-400">Senior Full Stack Developer</p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : {}}
                className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4"
              >
                {stats.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={textVariants}
                    className={`flex items-center space-x-2 bg-gray-900/50 p-2 md:p-3 rounded-lg border border-gray-800/50 ${item.highlight}`}
                    whileHover={{ y: -3 }}
                  >
                    <span className="text-xl md:text-2xl">{item.icon}</span>
                    <span className="text-gray-300 text-xs md:text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Signature element */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                className="mt-8 md:mt-10 flex justify-end"
              >
                <div className="px-3 py-1 bg-gray-900/70 border border-gray-800/50 rounded-md">
                  <p className="text-gray-300/80 font-mono text-xs">Since 2025</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-5 md:space-y-6 text-gray-400 text-base md:text-lg leading-relaxed"
          >
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : {}}
              className="relative pl-5 border-l-2 border-indigo-500/30"
            >
              <span className="absolute left-0 top-0 w-1 h-4 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full"></span>
              I'm a passionate <span className="text-indigo-300 font-medium">Senior Full Stack Developer</span> specializing in modern JavaScript ecosystems. With expertise in <span className="text-blue-300 font-medium">React, Next.js, and TypeScript</span>, I architect performant, scalable web applications.
            </motion.p>

            <motion.p
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : {}}
              transition={{ delay: 0.2 }}
              className="relative pl-5 border-l-2 border-indigo-500/30"
            >
              <span className="absolute left-0 top-0 w-1 h-4 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
              My approach combines <span className="text-purple-300 font-medium">clean code architecture</span> with <span className="text-cyan-300 font-medium">cutting-edge design</span>. I'm committed to writing efficient, maintainable code and creating seamless user experiences.
            </motion.p>

            <motion.p
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : {}}
              transition={{ delay: 0.4 }}
              className="relative pl-5 border-l-2 border-indigo-500/30"
            >
              <span className="absolute left-0 top-0 w-1 h-4 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></span>
              Currently focused on <span className="text-green-300 font-medium">performance optimization</span> and <span className="text-amber-300 font-medium">emerging web technologies</span>. When not coding, I mentor junior developers.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="pt-6 md:pt-8"
            >
              <motion.h3 
                className="text-gray-300 text-lg md:text-xl font-medium mb-4 md:mb-5"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                Technical Expertise
              </motion.h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.2 + (index * 0.03) }}
                    className={`px-3 py-1 ${tech.bg} border ${tech.border} rounded-full ${tech.color} text-xs md:text-sm font-medium`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Call to Action - Modern 2025 Style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
              className="pt-8 md:pt-10 flex flex-col sm:flex-row gap-3"
            >
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg font-medium flex items-center gap-2 shadow-lg transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">View Portfolio</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gray-900/70 border border-gray-800/50 text-gray-300 rounded-lg font-medium flex items-center gap-2 shadow-lg transition-all relative overflow-hidden group"
              >
                <span className="relative z-10">Contact Me</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="absolute inset-0 bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modern decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.6 }}
        className="absolute bottom-12 left-12 w-16 h-16 border-t-2 border-l-2 border-indigo-400/20 rounded-tl-lg"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute top-12 right-12 w-16 h-16 border-b-2 border-r-2 border-violet-400/20 rounded-br-lg"
      />
    </section>
  );
};

export default About;
