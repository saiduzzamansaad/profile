import React, { useState } from 'react';
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
  FiStar
} from 'react-icons/fi';

const ServicesPricing = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  // Premium color palette
  const colors = {
    primary: 'bg-gradient-to-r from-indigo-600 to-violet-600',
    secondary: 'bg-gradient-to-r from-teal-500 to-emerald-600',
    accent: 'bg-gradient-to-r from-rose-500 to-pink-600',
    dark: 'bg-gray-900',
    light: 'bg-gray-50'
  };

  const services = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Beautiful, responsive web interfaces with React, Vue, or Angular using modern frameworks like Tailwind CSS.",
      features: [
        "Custom UI/UX Design",
        "Responsive Layouts",
        "Performance Optimization",
        "Cross-browser Testing",
        "Component Libraries"
      ],
      color: colors.primary
    },
    {
      icon: <FiServer className="w-8 h-8" />,
      title: "Backend Development",
      description: "Robust server-side solutions with Node.js, Python, or PHP to power your applications.",
      features: [
        "RESTful API Development",
        "Database Integration",
        "Authentication Systems",
        "Server Configuration",
        "Cloud Deployment"
      ],
      color: colors.secondary
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Full Stack Solutions",
      description: "Complete web applications from front to back with seamless integration between all layers.",
      features: [
        "End-to-end Development",
        "Architecture Design",
        "CI/CD Pipeline Setup",
        "Performance Monitoring",
        "Maintenance Plans"
      ],
      color: colors.accent
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: "Database Design",
      description: "Optimized data storage solutions tailored to your application's specific needs.",
      features: [
        "SQL/NoSQL Design",
        "Data Modeling",
        "Query Optimization",
        "Migration Strategies",
        "Backup Solutions"
      ],
      color: colors.primary
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile Integration",
      description: "Progressive Web Apps or hybrid mobile solutions to extend your reach.",
      features: [
        "PWA Development",
        "React Native Apps",
        "Mobile-first Design",
        "Offline Capabilities",
        "Push Notifications"
      ],
      color: colors.secondary
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Performance Optimization",
      description: "Make your existing applications faster and more efficient.",
      features: [
        "Load Time Analysis",
        "Code Splitting",
        "Caching Strategies",
        "Bundle Optimization",
        "Lazy Loading"
      ],
      color: colors.accent
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      monthly: 999,
      yearly: 899,
      description: "Perfect for small projects or startups",
      features: [
        "Up to 5 pages",
        "Basic CMS Integration",
        "Responsive Design",
        "1 Revision Round",
        "1 Month Support"
      ],
      popular: false,
      color: 'from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-200',
      highlightColor: 'from-indigo-100 to-indigo-200'
    },
    {
      name: "Professional",
      monthly: 2499,
      yearly: 2199,
      description: "Ideal for growing businesses",
      features: [
        "Up to 15 pages",
        "Custom CMS Development",
        "SEO Optimization",
        "3 Revision Rounds",
        "3 Months Support",
        "Basic Analytics Setup"
      ],
      popular: true,
      color: 'from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
      highlightColor: 'from-purple-100 to-purple-200'
    },
    {
      name: "Enterprise",
      monthly: 4999,
      yearly: 4499,
      description: "For complex applications and enterprises",
      features: [
        "Unlimited Pages",
        "Full Stack Development",
        "Advanced Security",
        "Unlimited Revisions",
        "6 Months Support",
        "Performance Optimization",
        "Priority Support"
      ],
      popular: false,
      color: 'from-cyan-50 to-cyan-100',
      borderColor: 'border-cyan-200',
      highlightColor: 'from-cyan-100 to-cyan-200'
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
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
  };

  const planHover = {
    y: -15,
    scale: 1.03,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)"
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

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header with animation */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20 relative"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl"
          />
          <h2 className="text-5xl font-extrabold text-gray-900 sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            Services & Pricing
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Premium solutions crafted for your business success
          </p>
        </motion.div>

        {/* Services Section */}
        <div className="mb-28">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl font-bold text-center mb-16 text-gray-800"
          >
            <span className="relative inline-block">
              <span className="relative z-10">My Premium Services</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-3 bg-indigo-100/70 z-0"
                style={{ originX: 0 }}
              />
            </span>
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={cardHover}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-100 relative group"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredService === index ? 0.1 : 0,
                    scale: hoveredService === index ? 1.5 : 1
                  }}
                  transition={{ duration: 0.4 }}
                  className={`absolute inset-0 ${service.color} rounded-3xl`}
                />
                
                <div className="p-8 h-full flex flex-col relative z-10">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      animate={{
                        scale: hoveredService === index ? [1, 1.1, 1] : 1,
                        rotate: hoveredService === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 rounded-xl ${service.color} shadow-md mr-5`}
                    >
                      {service.icon}
                    </motion.div>
                    <h4 className="text-2xl font-bold text-gray-800">{service.title}</h4>
                  </div>
                  
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <motion.li 
                        key={i}
                        whileHover={{ x: 5 }}
                        className="flex items-center"
                      >
                        <FiCheck className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <motion.button
                    whileHover={{ 
                      x: 10,
                      background: service.color,
                      color: 'white'
                    }}
                    transition={{ duration: 0.3 }}
                    className="self-start flex items-center px-6 py-2 rounded-full border-2 border-indigo-100 text-indigo-600 font-medium mt-auto group-hover:border-transparent"
                  >
                    <span>Learn more</span>
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
            className="text-3xl font-bold text-center mb-16 text-gray-800"
          >
            <span className="relative inline-block">
              <span className="relative z-10">Flexible Pricing Plans</span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-3 bg-purple-100/70 z-0"
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
            <div className="inline-flex rounded-full shadow-lg bg-white p-1.5 border border-gray-200">
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-8 py-3 text-sm font-medium rounded-full transition-all duration-300 flex items-center ${
                  activeTab === 'monthly' 
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' 
                    : 'text-gray-700 hover:text-indigo-600'
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
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md' 
                    : 'text-gray-700 hover:text-indigo-600'
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
                Yearly <span className="ml-1 text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">20% OFF</span>
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative"
          >
            {/* Animated connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-cyan-100 rounded-full hidden lg:block"
              style={{ originX: 0 }}
            />
            
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
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredPlan === index ? 0.3 : 0.1,
                      scale: hoveredPlan === index ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4 }}
                    className={`absolute inset-0 rounded-3xl ${plan.highlightColor} blur-md`}
                  />
                )}
                
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className={`h-full bg-gradient-to-br ${plan.color} p-[2px] rounded-3xl`}>
                  <div className="bg-white rounded-[23px] h-full overflow-hidden">
                    <div className="px-8 py-10 h-full flex flex-col">
                      <h4 className="text-2xl font-bold text-center text-gray-900 mb-3">{plan.name}</h4>
                      <p className="text-center text-gray-600 mb-8">{plan.description}</p>
                      
                      <div className="flex justify-center mb-10 relative">
                        <motion.div
                          animate={{
                            scale: hoveredPlan === index ? 1.05 : 1
                          }}
                          transition={{ type: "spring" }}
                          className="text-6xl font-extrabold text-gray-900"
                        >
                          ${activeTab === 'monthly' ? plan.monthly : plan.yearly}
                        </motion.div>
                        <span className="self-end mb-2 ml-2 text-gray-500">
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
                            <FiCheck className={`mt-1 mr-3 flex-shrink-0 ${plan.popular ? 'text-purple-600' : 'text-indigo-500'}`} />
                            <span className="text-gray-700">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.button
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`mt-auto w-full py-4 px-6 rounded-xl font-bold transition-all ${
                          plan.popular 
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg' 
                            : 'bg-white border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 shadow-md'
                        }`}
                      >
                        Get Started
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
            className="mt-28 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-10 text-center shadow-2xl overflow-hidden relative"
          >
            {/* Floating elements */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full filter blur-xl"></div>
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full filter blur-xl"></div>
            
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
              className="absolute top-10 left-10 w-16 h-16 border-2 border-white/20 rounded-full"
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
              className="absolute bottom-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full"
            />
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Need a custom solution?</h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
                Let's collaborate to build something extraordinary tailored precisely to your business requirements.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-indigo-600 font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center mx-auto"
              >
                Request Custom Quote
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
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPricing;