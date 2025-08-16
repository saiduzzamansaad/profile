import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSend, FiMail, FiUser, FiMessageSquare, FiMapPin, FiPhone } from 'react-icons/fi';
import { useState, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

  // Enhanced 3D tilt effect with reduced motion for mobile
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e) => {
    // Only apply tilt effect on larger screens
    if (window.innerWidth > 768) {
      const rect = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - rect.left - rect.width / 2);
      y.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
      
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  // Animation variants for cleaner code
  const animationVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  // Memoized decorative elements for better performance
  const floatingElements = useMemo(() => [
    { top: '10%', left: '5%', size: 'w-16 h-16 md:w-24 md:h-24', color: 'bg-amber-500/10', shape: 'rounded-lg rotate-45', animation: { y: [0, -30, 0], duration: 15 } },
    { top: '75%', left: '3%', size: 'w-12 h-12 md:w-20 md:h-20', color: 'bg-emerald-500/10', shape: 'rounded-full', animation: { y: [0, 40, 0], duration: 18 } },
    { top: '25%', right: '8%', size: 'w-20 h-20 md:w-28 md:h-28', color: 'bg-indigo-500/10', shape: 'rounded-lg', animation: { y: [0, -50, 0], duration: 20 } },
    { top: '82%', right: '5%', size: 'w-10 h-10 md:w-16 md:h-16', color: 'bg-rose-500/10', shape: 'rounded-full', animation: { y: [0, 30, 0], duration: 16 } }
  ], []);

  const particles = useMemo(() => 
    [...Array(window.innerWidth < 768 ? 10 : 20)].map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 20,
      delay: Math.random() * 5,
      color: ['bg-amber-400/20', 'bg-emerald-400/20', 'bg-indigo-400/20', 'bg-rose-400/20'][Math.floor(Math.random() * 4)]
    }))
  , []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section 
      id="contact" 
      ref={ref}
      className="w-full py-16 md:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Optimized background texture */}
      <div className="absolute inset-0 opacity-10 md:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] bg-[length:100px_100px]"></div>
      </div>

      {/* Floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: element.animation.y, opacity: 0.2 }}
          transition={{
            duration: element.animation.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute filter blur-md md:blur-xl ${element.size} ${element.color} ${element.shape}`}
          style={{ top: element.top, left: element.left, right: element.right }}
        />
      ))}

      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.3, 1.5, 0.3],
            transition: {
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }
          }}
          className={`absolute rounded-full ${particle.color}`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}

      {/* Decorative borders */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 0.1, scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
      />
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 0.1, scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
      />

      {/* Watermark text - optimized for mobile */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 0.03, x: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="absolute top-10 md:top-20 left-0 text-[60px] md:text-[220px] font-bold text-gray-700 tracking-tighter select-none font-serif"
      >
        CONTACT
      </motion.div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pb-12 md:pb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold inline-block relative text-gray-100 mb-6 font-serif">
            <span className="relative">
              Let's Connect
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-indigo-500 origin-left"
              />
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="py-2 md:py-4 text-gray-400 max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed"
          >
            Interested in collaborating or have questions? Reach out through the form or connect with me directly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 0.3, scaleX: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-6 md:mt-8 w-3/4 mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Contact Info - optimized for mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8"
          >
            {[
              {
                icon: <FiMail className="text-xl md:text-2xl" />,
                title: "Email Me",
                content: "saiduzzaman113@gmail.com",
                color: "amber",
                href: "mailto:saiduzzaman113@gmail.com"
              },
              {
                icon: <FiPhone className="text-xl md:text-2xl" />,
                title: "Call Me",
                content: "+8801788637109",
                color: "emerald",
                href: "tel:+8801788637109"
              },
              {
                icon: <FiMapPin className="text-xl md:text-2xl" />,
                title: "Location",
                content: "Sylhet, Bangladesh",
                color: "indigo",
                href: "#"
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.2 }}
                whileHover={{ 
                  y: -4,
                  borderColor: `rgba(var(--${item.color}-500), 0.3)`,
                  backgroundColor: 'rgba(17, 24, 39, 0.7)'
                }}
                className="flex items-start space-x-4 md:space-x-6 p-6 md:p-8 bg-gray-900/60 backdrop-blur-sm md:backdrop-blur-lg rounded-xl border border-gray-700/50 transition-all shadow-lg"
              >
                <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br from-${item.color}-600/20 to-${item.color}-600/10 text-${item.color}-400 flex-shrink-0 shadow-lg`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-1 md:mb-2 font-serif">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className={`text-gray-400 hover:text-${item.color}-400 transition-colors text-base md:text-lg`}>
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-400 text-base md:text-lg">{item.content}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form - optimized for mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Form decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 0.3, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-amber-600/10 via-indigo-600/10 to-emerald-600/10 rounded-2xl md:rounded-3xl transform rotate-3 blur-md md:blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 0.2, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="absolute -inset-3 md:-inset-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl md:rounded-2xl transform -rotate-2 blur-sm md:blur-lg"
            />

            {/* Form container */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: window.innerWidth > 768 ? rotateX : 0,
                rotateY: window.innerWidth > 768 ? rotateY : 0,
                transformStyle: 'preserve-3d'
              }}
              className="bg-gray-900/80 backdrop-blur-sm md:backdrop-blur-xl p-6 md:p-10 rounded-xl md:rounded-2xl border border-gray-700/50 shadow-xl md:shadow-2xl relative overflow-hidden"
            >
              {/* Form background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-20 h-20 md:w-40 md:h-40 border-t-2 border-r-2 border-amber-500/50 rounded-tr-xl md:rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 md:w-40 md:h-40 border-b-2 border-l-2 border-indigo-500/50 rounded-bl-xl md:rounded-bl-2xl"></div>
              </div>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-center py-8 md:py-12"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-emerald-600/20 to-emerald-600/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg border border-emerald-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-12 md:w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-100 mb-3 md:mb-4 font-serif">Message Received</h3>
                  <p className="text-gray-400 text-sm md:text-base lg:text-lg max-w-md mx-auto">Thank you for your inquiry. I'll respond within 24 hours.</p>
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: 'rgba(31, 41, 55, 0.9)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 md:mt-8 px-6 py-2 md:px-8 md:py-3 rounded-lg font-medium bg-gray-800/80 hover:bg-gray-800/90 text-gray-200 border border-gray-700/50 transition-all shadow-lg text-sm md:text-base"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8 relative z-10">
                  {[
                    {
                      name: 'name',
                      label: 'Your Name',
                      icon: <FiUser className="mr-2 text-amber-400" />,
                      type: 'text',
                      placeholder: 'John Doe',
                      validation: { required: 'Name is required' },
                      error: errors.name
                    },
                    {
                      name: 'email',
                      label: 'Email Address',
                      icon: <FiMail className="mr-2 text-indigo-400" />,
                      type: 'email',
                      placeholder: 'john@example.com',
                      validation: { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      },
                      error: errors.email
                    },
                    {
                      name: 'message',
                      label: 'Your Message',
                      icon: <FiMessageSquare className="mr-2 text-emerald-400" />,
                      type: 'textarea',
                      placeholder: 'Hello, I\'d like to discuss...',
                      validation: { 
                        required: 'Message is required', 
                        minLength: { 
                          value: 10, 
                          message: 'Message must be at least 10 characters' 
                        } 
                      },
                      error: errors.message
                    }
                  ].map((field, index) => (
                    <motion.div
                      key={field.name}
                      variants={animationVariants}
                      initial="hidden"
                      animate={inView ? "visible" : {}}
                      custom={index}
                    >
                      <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2 md:mb-3 flex items-center">
                        {field.icon} {field.label}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          {...register(field.name, field.validation)}
                          id={field.name}
                          rows="4"
                          className="w-full px-4 py-3 md:px-5 md:py-4 bg-gray-900/70 border border-gray-700/50 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all shadow-inner text-sm md:text-base"
                          placeholder={field.placeholder}
                        />
                      ) : (
                        <input
                          {...register(field.name, field.validation)}
                          type={field.type}
                          id={field.name}
                          className="w-full px-4 py-3 md:px-5 md:py-4 bg-gray-900/70 border border-gray-700/50 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all shadow-inner text-sm md:text-base"
                          placeholder={field.placeholder}
                        />
                      )}
                      {field.error && <p className="text-amber-400 text-xs md:text-sm mt-1 md:mt-2">{field.error.message}</p>}
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 25px -5px rgba(245, 158, 11, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`flex items-center justify-center w-full py-3 px-5 md:py-4 md:px-6 rounded-lg md:rounded-xl font-medium transition-all ${
                      isLoading 
                        ? 'bg-amber-700/70 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500'
                    } text-white shadow-lg md:shadow-xl text-sm md:text-base lg:text-lg relative overflow-hidden group`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2 text-base group-hover:translate-x-1 transition-transform" /> Send Message
                      </>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-indigo-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                    />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative corner elements - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 2 }}
        className="hidden md:block absolute bottom-20 left-20 w-24 h-24 border-t-4 border-l-4 border-amber-400/20 rounded-tl-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 2.2 }}
        className="hidden md:block absolute top-20 right-20 w-24 h-24 border-b-4 border-r-4 border-indigo-400/20 rounded-br-xl"
      />
    </section>
  );
};

export default Contact;
