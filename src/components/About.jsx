import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Dynamic color values for interactive elements
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    controls.start({ rotateX: 0, rotateY: 0 });
    x.set(0);
    y.set(0);
  };

  // Animation sequences
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
      });
    }
  }, [controls, inView]);

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -30, 0],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants2 = {
    initial: { y: 0 },
    animate: {
      y: [0, 40, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 3
      }
    }
  };

  const floatingVariants3 = {
    initial: { x: 0 },
    animate: {
      x: [0, 30, 0],
      transition: {
        duration: 18,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const techStack = [
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
  ];

  const stats = [
    { icon: '👨‍💻', label: '8+ Years Exp', highlight: 'text-indigo-300' },
    { icon: '🚀', label: '120+ Projects', highlight: 'text-blue-300' },
    { icon: '🌐', label: 'Global Clients', highlight: 'text-cyan-300' },
    { icon: '📱', label: 'Mobile First', highlight: 'text-purple-300' },
    { icon: '⚡', label: 'High Performance', highlight: 'text-green-300' },
    { icon: '🔒', label: 'Secure Code', highlight: 'text-pink-300' },
    { icon: '🧠', label: 'AI Integration', highlight: 'text-amber-300' },
    { icon: '📈', label: 'Scalable Solutions', highlight: 'text-emerald-300' }
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className="w-full py-24 md:py-40 relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
      style={{ perspective: '1000px' }}
    >
      {/* Luxury background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic floating elements */}
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-700/10 via-violet-700/10 to-purple-700/10 blur-[100px] md:blur-[150px]"
        />
        <motion.div
          variants={floatingVariants2}
          initial="initial"
          animate="animate"
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-blue-700/10 via-cyan-700/10 to-teal-700/10 blur-[110px] md:blur-[160px]"
        />
        <motion.div
          variants={floatingVariants3}
          initial="initial"
          animate="animate"
          className="absolute top-1/2 right-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-purple-700/10 via-pink-700/10 to-rose-700/10 blur-[90px] md:blur-[140px]"
        />

        {/* Luxury grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMCAzOC4zMzdDMTkuNDE3IDM4LjMzNyAxOC44MzMgMzguMTQzIDE4LjMzMyAzNy43NUwxLjY2NiAyMy43NUMwLjY2NiAyMi45NTkgMC4yNSAyMS43NSAwLjI1IDIwLjVWMTkuNUMwLjI1IDE4LjI1IDAuNjY2IDE3LjA0MSAxLjY2NiAxNi4yNUwxOC4zMzMgMi4yNUMxOC44MzMgMS44NTcgMTkuNDE3IDEuNjYzIDIwIDEuNjYzQzIwLjU4MyAxLjY2MyAyMS4xNjcgMS44NTcgMjEuNjY3IDIuMjVMMzguMzM0IDE2LjI1QzM5LjMzNCAxNy4wNDEgMzkuNzUgMTguMjUgMzkuNzUgMTkuNVYyMC41QzM5Ljc1IDIxLjc1IDM5LjMzNCAyMi45NTkgMzguMzM0IDIzLjc1TDIxLjY2NyAzNy43NUMyMS4xNjcgMzguMTQzIDIwLjU4MyAzOC4zMzcgMjAgMzguMzM3WiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvZz48L3N2Zz4=')]"></div>
        </div>

        {/* Micro-interaction particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                scale: 0.5
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.5, 1.2, 0.5],
                transition: {
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }
              }}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 0.77, 0.47, 0.97] }}
          className="pb-16 md:pb-24 text-center"
        >
          <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300 inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-0.5 bg-gradient-to-r from-indigo-500/70 via-violet-500/70 to-purple-500/70 mt-6 md:mt-8 w-40 md:w-56 mx-auto"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.3 } : {}}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-6 md:mt-8 w-3/4 mx-auto"
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 0.77, 0.47, 0.97] }}
            className="relative"
          >
            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 0.3, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="absolute -inset-6 md:-inset-8 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 rounded-3xl md:rounded-[2rem] transform rotate-3 blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 0.2, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.9 }}
              className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl md:rounded-3xl transform -rotate-2 blur-lg"
            />

            {/* Main card */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              }}
              className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden"
            >
              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.15 } : {}}
                transition={{ duration: 1.5, delay: 1.2 }}
                className="absolute -inset-12 bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-purple-500/20 pointer-events-none"
              />

              {/* Animated border */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 1.5 }}
                className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 0 1px rgba(165, 180, 252, 0.1)',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)'
                }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 leading-tight"
              >
                <p>Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">MD. SAIDUZZAMAN</span></p>
                <p className="mt-4 md:mt-6 text-xl sm:text-2xl md:text-3xl text-gray-400/90">Senior Full Stack Developer</p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : {}}
                className="mt-8 md:mt-12 grid grid-cols-2 gap-4 md:gap-6"
              >
                {stats.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={textVariants}
                    className={`flex items-center space-x-3 bg-gray-900/50 p-3 md:p-4 rounded-xl border border-gray-800/50 shadow-lg hover:shadow-indigo-500/10 transition-all ${item.highlight}`}
                    whileHover={{ 
                      y: -5, 
                      scale: 1.03,
                      backgroundColor: 'rgba(30, 41, 59, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl md:text-3xl">{item.icon}</span>
                    <span className="text-gray-300/90 text-sm md:text-base">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Signature element */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.8 }}
                className="mt-10 md:mt-14 flex justify-end"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-lg blur-sm"></div>
                  <div className="relative px-4 py-2 bg-gray-900/70 border border-gray-800/50 rounded-lg">
                    <p className="text-gray-300/80 font-mono text-sm">Since 2025</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 0.77, 0.47, 0.97] }}
            className="space-y-7 md:space-y-9 text-gray-400/90 text-lg md:text-xl leading-relaxed"
          >
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : {}}
              className="relative pl-6 border-l-2 border-indigo-500/30"
            >
              <span className="absolute left-0 top-0 w-1 h-6 bg-gradient-to-b from-indigo-500 to-violet-500 rounded-full"></span>
              I'm a passionate <span className="text-indigo-300 font-medium">Senior Full Stack Developer</span> specializing in modern JavaScript ecosystems. With expertise in <span className="text-blue-300 font-medium">React, Next.js, and TypeScript</span>, I architect performant, scalable web applications with pixel-perfect interfaces.
            </motion.p>

            <motion.p
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : {}}
              transition={{ delay: 0.3 }}
              className="relative pl-6 border-l-2 border-indigo-500/30"
            >
              <span className="absolute left-0 top-0 w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></span>
              My approach combines <span className="text-purple-300 font-medium">clean code architecture</span> with <span className="text-cyan-300 font-medium">cutting-edge design principles</span>. I'm committed to writing efficient, maintainable code and creating seamless user experiences across all platforms.
            </motion.p>

            <motion.p
              variants={textVariants}
              initial="hidden"
              animate={inView ? "visible" : {}}
              transition={{ delay: 0.6 }}
              className="relative pl-6 border-l-2 border-indigo-500/30"
            >
              <span className="absolute left-0 top-0 w-1 h-6 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"></span>
              Currently focused on <span className="text-green-300 font-medium">performance optimization</span> and <span className="text-amber-300 font-medium">emerging web technologies</span>. When not coding, I mentor junior developers and contribute to open-source projects.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="pt-8 md:pt-12"
            >
              <motion.h3 
                className="text-gray-300 text-xl md:text-2xl font-medium mb-5 md:mb-7"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
              >
                Technical Expertise
              </motion.h3>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.4 + (index * 0.05) }}
                    className={`px-4 py-2 ${tech.bg} border ${tech.border} rounded-full ${tech.color} text-sm md:text-base font-medium shadow-lg hover:shadow-indigo-500/10 transition-all`}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: 'rgba(15, 23, 42, 0.5)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8 }}
              className="pt-10 md:pt-14 flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 30px -5px rgba(99, 102, 241, 0.5)"
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl font-medium flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <span className="relative z-10">View My Portfolio</span>
                <motion.span
                  className="relative z-10"
                  animate={{ 
                    x: [0, 5, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 30px -5px rgba(236, 72, 153, 0.3)"
                }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-gray-900/70 border border-gray-800/50 text-gray-300 rounded-xl font-medium flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
              >
                <span className="relative z-10">Download CV</span>
                <motion.span
                  className="relative z-10"
                  animate={{ 
                    y: [0, -2, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Luxury decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-16 left-16 w-20 h-20 border-t-4 border-l-4 border-indigo-400/30 rounded-tl-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
        className="absolute top-16 right-16 w-20 h-20 border-b-4 border-r-4 border-violet-400/30 rounded-br-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : {}}
        transition={{ delay: 2.4 }}
        className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 blur-3xl"
      />
    </section>
  );
};

export default About;
