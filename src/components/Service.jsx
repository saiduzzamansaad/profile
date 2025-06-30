import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiCode, 
  FiDatabase, 
  FiLayers, 
  FiServer, 
  FiSmartphone, 
  FiZap,
  FiArrowRight,
  FiStar,
  FiAward,
  FiGlobe,
  FiShield,
  FiTrendingUp
} from 'react-icons/fi';

const ServicesPricing = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Premium 2025 color palette (dark theme)
  const colors = {
    primary: 'bg-gradient-to-r from-indigo-600 to-violet-600',
    secondary: 'bg-gradient-to-r from-teal-500 to-emerald-600',
    accent: 'bg-gradient-to-r from-rose-500 to-pink-600',
    dark: 'bg-gray-900',
    light: 'bg-gray-50',
    premiumDark: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    premiumAccent: 'bg-gradient-to-r from-purple-600 to-blue-500'
  };

  const services = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Cutting-edge web interfaces with React, Vue, or Angular using Next.js, Tailwind CSS, and 2025 design systems.",
      features: [
        "Custom UI/UX Design",
        "Micro-interactions & Animations",
        "Web3 Integration",
        "AR/VR Components",
        "AI-Powered Interfaces"
      ],
      color: colors.primary,
      badge: "Trending 2025"
    },
    {
      icon: <FiServer className="w-8 h-8" />,
      title: "Backend Development",
      description: "Scalable serverless architectures with Node.js, Python, or Go using cutting-edge cloud technologies.",
      features: [
        "GraphQL & REST APIs",
        "Blockchain Integration",
        "Real-time Systems",
        "AI Model Serving",
        "Edge Computing"
      ],
      color: colors.secondary,
      badge: "Enterprise Grade"
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Full Stack Solutions",
      description: "Complete web3 applications with seamless integration between frontend, backend, and smart contracts.",
      features: [
        "Web3 Authentication",
        "Decentralized Storage",
        "Smart Contract Integration",
        "Tokenomics Design",
        "DAO Governance"
      ],
      color: colors.accent,
      badge: "Web3 Ready"
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: "AI Data Systems",
      description: "Vector databases and optimized data pipelines for machine learning and AI applications.",
      features: [
        "Vector Database Design",
        "LLM Fine-tuning",
        "Data Pipelines",
        "AI Model Integration",
        "Real-time Analytics"
      ],
      color: colors.primary,
      badge: "AI Optimized"
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile & XR",
      description: "Immersive mobile experiences with React Native, Flutter, and AR/VR capabilities.",
      features: [
        "Metaverse Integration",
        "ARKit/ARCore Apps",
        "WebXR Experiences",
        "Wearable Tech",
        "Spatial Computing"
      ],
      color: colors.secondary,
      badge: "XR Focused"
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Performance & Security",
      description: "Quantum-resistant encryption and edge-optimized performance for mission-critical apps.",
      features: [
        "Zero Trust Architecture",
        "Edge Caching",
        "WebAssembly Optimization",
        "Post-Quantum Crypto",
        "Threat Modeling"
      ],
      color: colors.accent,
      badge: "Ultra Secure"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      monthly: 150,
      yearly: 1800,
      description: "For early-stage startups and MVPs",
      features: [
        "Up to 10 pages",
        "Basic Web3 Integration",
        "Responsive Design",
        "2 Revision Rounds",
        "3 Months Support",
        "Basic Analytics"
      ],
      popular: false,
      color: 'from-gray-800 to-gray-900',
      borderColor: 'border-indigo-500/30',
      highlightColor: 'from-indigo-900/50 to-indigo-800/50',
      ctaColor: 'bg-indigo-600 hover:bg-indigo-700'
    },
    {
      name: "Enterprise",
      monthly: 300,
      yearly: 3600,
      description: "For scaling businesses and Web3 projects",
      features: [
        "Unlimited Pages",
        "AI Integration",
        "5 Revision Rounds",
        "12 Months Support",
        "Advanced Analytics",
        "Priority Support",
        "Dedicated Team"
      ],
      popular: true,
      color: 'from-purple-900/80 to-indigo-900/80',
      borderColor: 'border-purple-500/50',
      highlightColor: 'from-purple-900/70 to-indigo-900/70',
      ctaColor: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
      badge: "Most Advanced"
    },
    {
      name: "Elite",
      monthly: 1000,
      yearly: 12000,
      description: "For Fortune 500 and blockchain enterprises",
      features: [
        "Custom Web3 Stack",
        "Metaverse Integration",
        "Quantum Security",
        "Unlimited Revisions",
        "24/7 Support",
        "Enterprise Analytics",
        "Executive Reporting",
        "Dedicated CTO",
        "Smart Contract Audits"
      ],
      popular: false,
      color: 'from-cyan-900/80 to-blue-900/80',
      borderColor: 'border-cyan-500/50',
      highlightColor: 'from-cyan-900/70 to-blue-900/70',
      ctaColor: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700',
      badge: "VIP Tier"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardHover = {
    y: -8,
    scale: 1.02,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  };

  const planHover = {
    y: -15,
    scale: 1.03,
    boxShadow: "0 35px 60px -15px rgba(0, 0, 0, 0.3)"
  };

  const borderAnimation = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatingAnimation = {
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`py-20 ${colors.premiumDark} px-4 sm:px-6 lg:px-8 overflow-hidden relative`}>
      {/* Animated background elements */}
      <motion.div 
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-900/10 to-blue-900/10 rounded-full filter blur-3xl"
      />
      <motion.div 
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          rotate: [0, -8, 0]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-indigo-900/10 to-violet-900/10 rounded-full filter blur-3xl"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with premium animation */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20 relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ delay: 0.4, duration: 1.5 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl"
          />
          <h2 className="text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
            Premium Services & Pricing
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Cutting-edge 2025 solutions for visionary businesses
          </p>
          
          {/* Animated decorative elements */}
          <motion.div 
            animate="float"
            variants={floatingAnimation}
            className="absolute -top-5 left-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
          />
          <motion.div 
            animate={{
              ...floatingAnimation.float,
              transition: { ...floatingAnimation.float.transition, delay: 0.5 }
            }}
            className="absolute top-10 right-1/4 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 shadow-lg"
          />
        </motion.div>

        {/* Services Section */}
        <div className="mb-28">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl font-bold text-center mb-16 text-white"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Our 2025 Service Portfolio</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-3 bg-indigo-500/30 z-0"
                style={{ originX: 0 }}
              />
            </span>
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={cardHover}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-700/50 relative group"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredService === index ? 0.2 : 0,
                    scale: hoveredService === index ? 1.5 : 1
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 ${service.color} rounded-3xl`}
                />
                
                {/* Service badge */}
                {service.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-900 to-gray-800 text-xs font-bold text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20 shadow">
                    {service.badge}
                  </div>
                )}
                
                <div className="p-8 h-full flex flex-col relative z-10">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      animate={{
                        scale: hoveredService === index ? [1, 1.1, 1] : 1,
                        rotate: hoveredService === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 rounded-xl ${service.color} shadow-lg mr-5`}
                    >
                      {service.icon}
                    </motion.div>
                    <h4 className="text-2xl font-bold text-white">{service.title}</h4>
                  </div>
                  
                  <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-center"
                      >
                        <FiCheck className={`text-indigo-400 mr-3 flex-shrink-0 ${hoveredService === index ? 'animate-pulse' : ''}`} />
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ 
                      x: 10,
                      background: service.color,
                      color: 'white',
                      boxShadow: `0 10px 25px -5px ${service.color.includes('indigo') ? 'rgba(79, 70, 229, 0.4)' : 
                                service.color.includes('teal') ? 'rgba(20, 184, 166, 0.4)' : 'rgba(244, 63, 94, 0.4)'}`
                    }}
                    transition={{ duration: 0.3 }}
                    className="self-start flex items-center px-6 py-3 rounded-full bg-gray-700 text-white font-medium mt-auto group-hover:bg-transparent group-hover:border group-hover:border-indigo-400/50"
                  >
                    <span>Explore Service</span>
                    <motion.span
                      animate={{
                        x: hoveredService === index ? [0, 5, 0] : 0
                      }}
                      transition={{ 
                        repeat: hoveredService === index ? Infinity : 0,
                        duration: 1.5
                      }}
                      className="ml-2"
                    >
                      <FiArrowRight />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Pricing Section */}
        <div>
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl font-bold text-center mb-16 text-white"
          >
            <span className="relative inline-block">
              <span className="relative z-10">2025 Premium Pricing</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-3 bg-purple-500/30 z-0"
                style={{ originX: 0 }}
              />
            </span>
          </motion.h3>
          
          {/* Toggle with enhanced animation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex justify-center mb-16"
          >
            <div className="inline-flex rounded-full shadow-lg bg-gray-800 p-1.5 border border-gray-700">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-300 flex items-center ${
                  activeTab === 'monthly' 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white bg-gray-700'
                }`}
              >
                {activeTab === 'monthly' && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mr-2"
                  >
                    <FiStar className="w-4 h-4" />
                  </motion.span>
                )}
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('yearly')}
                className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-300 flex items-center ${
                  activeTab === 'yearly' 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg' 
                    : 'text-gray-300 hover:text-white bg-gray-700'
                }`}
              >
                {activeTab === 'yearly' && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mr-2"
                  >
                    <FiStar className="w-4 h-4" />
                  </motion.span>
                )}
                Yearly <span className="ml-1 text-xs bg-indigo-900 text-indigo-200 px-2 py-0.5 rounded-full">25% OFF</span>
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative"
          >
            {/* Animated connecting line */}
            {!isMobile && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-blue-900/30 rounded-full hidden lg:block"
                style={{ originX: 0 }}
              />
            )}
            
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={planHover}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative rounded-3xl transition-all duration-500 ${plan.popular ? 'lg:-mt-6 lg:mb-6' : ''}`}
              >
                {/* Animated border */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  variants={borderAnimation}
                  className={`absolute inset-0 rounded-3xl ${plan.borderColor} border-2 pointer-events-none`}
                />
                
                {/* Glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredPlan === index ? (plan.popular ? 0.3 : 0.2) : plan.popular ? 0.15 : 0.05,
                    scale: hoveredPlan === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 rounded-3xl ${plan.highlightColor} blur-lg`}
                />
                
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-xl flex items-center">
                    <FiAward className="mr-2" />
                    {plan.badge || "Most Popular"}
                  </div>
                )}
                
                {plan.name === "Elite" && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-xl flex items-center">
                    <FiTrendingUp className="mr-2" />
                    {plan.badge}
                  </div>
                )}
                
                <div className={`h-full bg-gradient-to-br ${plan.color} p-[2px] rounded-3xl`}>
                  <div className="bg-gray-900 rounded-[23px] h-full overflow-hidden">
                    <div className="px-8 py-10 h-full flex flex-col">
                      <h4 className="text-2xl font-bold text-center text-white mb-3">{plan.name}</h4>
                      <p className="text-center text-gray-400 mb-8">{plan.description}</p>
                      
                      <div className="flex justify-center mb-10 relative">
                        <motion.div
                          animate={{
                            scale: hoveredPlan === index ? 1.05 : 1
                          }}
                          transition={{ type: "spring" }}
                          className="text-6xl font-extrabold text-white"
                        >
                          ${activeTab === 'monthly' ? plan.monthly.toLocaleString() : plan.yearly.toLocaleString()}
                        </motion.div>
                        <span className="self-end mb-2 ml-2 text-gray-400">
                          /{activeTab === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                      
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((feature, i) => (
                          <motion.li 
                            key={i}
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <FiCheck className={`mt-1 mr-3 flex-shrink-0 ${plan.popular ? 'text-purple-400' : 'text-indigo-400'}`} />
                            <span className="text-gray-300">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`mt-auto w-full py-4 px-6 rounded-xl font-bold transition-all shadow-lg ${plan.ctaColor} text-white`}
                      >
                        Get Started Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Premium Custom Project CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mt-28 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-3xl p-10 text-center shadow-2xl overflow-hidden relative border border-gray-700/50"
          >
            {/* Floating elements */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full filter blur-xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/5 rounded-full filter blur-xl"></div>
            
            {/* Animated circles */}
            <motion.div 
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-10 left-10 w-16 h-16 border-2 border-white/10 rounded-full"
            />
            <motion.div 
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
                rotate: [0, -8, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white/10 rounded-full"
            />
            
            <div className="relative z-10">
              <div className="inline-flex items-center bg-gray-800/50 border border-indigo-500/30 px-4 py-2 rounded-full mb-6">
                <FiGlobe className="text-indigo-400 mr-2" />
                <span className="text-indigo-300 text-sm font-medium">Global 24/7 Support</span>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">Need a Bespoke Solution?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Our executive team crafts ultra-premium solutions for Fortune 500 clients and blockchain unicorns.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  Request Executive Demo
                  <motion.span
                    animate={{
                      x: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="ml-3"
                  >
                    <FiArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gray-800 border border-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <FiShield className="mr-2 text-indigo-400" />
                  Security Briefing
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPricing;
