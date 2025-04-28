import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSend, FiMail, FiUser, FiMessageSquare, FiMapPin, FiPhone } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

  // Enhanced 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputAnimation = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  // Premium floating elements
  const floatingElements = [
    { top: '10%', left: '5%', size: 'w-24 h-24', color: 'bg-amber-500/10', shape: 'rounded-lg rotate-45', animation: { y: [0, -40, 0], duration: 15 } },
    { top: '75%', left: '3%', size: 'w-20 h-20', color: 'bg-emerald-500/10', shape: 'rounded-full', animation: { y: [0, 50, 0], duration: 18 } },
    { top: '25%', right: '8%', size: 'w-28 h-28', color: 'bg-indigo-500/10', shape: 'rounded-lg', animation: { y: [0, -60, 0], duration: 20 } },
    { top: '82%', right: '5%', size: 'w-16 h-16', color: 'bg-rose-500/10', shape: 'rounded-full', animation: { y: [0, 40, 0], duration: 16 } }
  ];

  // Luxury particles
  const particles = [...Array(20)].map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 8 + Math.random() * 20,
    delay: Math.random() * 5,
    color: ['bg-amber-400/30', 'bg-emerald-400/30', 'bg-indigo-400/30', 'bg-rose-400/30'][Math.floor(Math.random() * 4)]
  }));

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section 
      id="contact" 
      ref={ref}
      className="w-full py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Premium background texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
      </div>

      {/* Luxury floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: element.animation.y, opacity: 0.3 }}
          transition={{
            duration: element.animation.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute filter blur-xl ${element.size} ${element.color} ${element.shape}`}
          style={{ top: element.top, left: element.left, right: element.right }}
        />
      ))}

      {/* Animated luxury particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 0,
            scale: 0.3
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.3, 1.8, 0.3],
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

      {/* Luxury decorative borders */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 0.1, scaleX: 1 } : {}}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
      />
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 0.1, scaleX: 1 } : {}}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
      />

      {/* Watermark text */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={inView ? { opacity: 0.03, x: 0 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-0 text-[100px] md:text-[220px] font-bold text-gray-700 tracking-tighter select-none font-serif"
      >
        CONTACT
      </motion.div>
      
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 flex flex-col justify-center h-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pb-20 text-center"
        >
          <p className="text-5xl md:text-6xl font-bold inline-block relative text-gray-100 mb-8 font-serif">
            <span className="relative">
              Let's Connect
              <motion.span 
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-indigo-500 origin-left"
              />
            </span>
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="py-4 text-gray-400 max-w-[700px] mx-auto text-lg md:text-xl leading-relaxed"
          >
            Interested in collaborating or have questions about my services? 
            Reach out through the form or connect with me directly for a consultation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 0.3, scaleX: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mt-8 w-3/4 mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              whileHover={{ 
                y: -8,
                borderColor: 'rgba(245, 158, 11, 0.3)',
                backgroundColor: 'rgba(17, 24, 39, 0.7)'
              }}
              className="flex items-start space-x-6 p-8 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-700/50 transition-all shadow-lg"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-600/20 to-amber-600/10 text-amber-400 flex-shrink-0 shadow-lg">
                <FiMail className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2 font-serif">Email Me</h3>
                <p className="text-gray-400 hover:text-amber-400 transition-colors text-lg">
                  <a href="mailto:contact@luxurydesign.com" className="hover:underline">saiduzzaman113@gmail.com</a>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              whileHover={{ 
                y: -8,
                borderColor: 'rgba(16, 185, 129, 0.3)',
                backgroundColor: 'rgba(17, 24, 39, 0.7)'
              }}
              className="flex items-start space-x-6 p-8 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-700/50 transition-all shadow-lg"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-600/20 to-emerald-600/10 text-emerald-400 flex-shrink-0 shadow-lg">
                <FiPhone className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2 font-serif">Call Me</h3>
                <p className="text-gray-400 hover:text-emerald-400 transition-colors text-lg">
                  <a href="tel:+1234567890" className="hover:underline">+8801788637109</a>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              whileHover={{ 
                y: -8,
                borderColor: 'rgba(99, 102, 241, 0.3)',
                backgroundColor: 'rgba(17, 24, 39, 0.7)'
              }}
              className="flex items-start space-x-6 p-8 bg-gray-900/60 backdrop-blur-lg rounded-xl border border-gray-700/50 transition-all shadow-lg"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-600/20 to-indigo-600/10 text-indigo-400 flex-shrink-0 shadow-lg">
                <FiMapPin className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2 font-serif">Location</h3>
                <p className="text-gray-400 text-lg">Sylhet, Bangladesh</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Luxury form decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 0.4, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="absolute -inset-6 bg-gradient-to-br from-amber-600/10 via-indigo-600/10 to-emerald-600/10 rounded-3xl transform rotate-3 blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 0.3, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.9 }}
              className="absolute -inset-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl transform -rotate-2 blur-lg"
            />

            {/* Luxury form container */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              }}
              className="bg-gray-900/80 backdrop-blur-xl p-10 rounded-2xl border border-gray-700/50 shadow-2xl relative overflow-hidden"
            >
              {/* Luxury form background pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-40 h-40 border-t-2 border-r-2 border-amber-500/50 rounded-tr-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 border-b-2 border-l-2 border-indigo-500/50 rounded-bl-2xl"></div>
              </div>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-600/20 to-emerald-600/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg border border-emerald-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-100 mb-4 font-serif">Message Received</h3>
                  <p className="text-gray-400 text-lg max-w-md mx-auto">Thank you for your inquiry. I'll respond within 24 hours.</p>
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      backgroundColor: 'rgba(31, 41, 55, 0.9)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 px-8 py-3 rounded-lg font-medium bg-gray-800/80 hover:bg-gray-800/90 text-gray-200 border border-gray-700/50 transition-all shadow-lg"
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                  <motion.div
                    variants={inputAnimation}
                    initial="hidden"
                    animate={inView ? "visible" : {}}
                    custom={0}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FiUser className="mr-2 text-amber-400" /> Your Name
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className="w-full px-5 py-4 bg-gray-900/70 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all shadow-inner"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-amber-400 text-sm mt-2">{errors.name.message}</p>}
                  </motion.div>

                  <motion.div
                    variants={inputAnimation}
                    initial="hidden"
                    animate={inView ? "visible" : {}}
                    custom={1}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FiMail className="mr-2 text-indigo-400" /> Email Address
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      id="email"
                      className="w-full px-5 py-4 bg-gray-900/70 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all shadow-inner"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-amber-400 text-sm mt-2">{errors.email.message}</p>}
                  </motion.div>

                  <motion.div
                    variants={inputAnimation}
                    initial="hidden"
                    animate={inView ? "visible" : {}}
                    custom={2}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <FiMessageSquare className="mr-2 text-emerald-400" /> Your Message
                    </label>
                    <textarea
                      {...register('message', { 
                        required: 'Message is required', 
                        minLength: { 
                          value: 10, 
                          message: 'Message must be at least 10 characters' 
                        } 
                      })}
                      id="message"
                      rows="6"
                      className="w-full px-5 py-4 bg-gray-900/70 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all shadow-inner"
                      placeholder="Hello, I'd like to discuss..."
                    ></textarea>
                    {errors.message && <p className="text-amber-400 text-sm mt-2">{errors.message.message}</p>}
                  </motion.div>

                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 30px -5px rgba(245, 158, 11, 0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`flex items-center justify-center w-full py-4 px-6 rounded-xl font-medium transition-all ${
                      isLoading 
                        ? 'bg-amber-700/70 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500'
                    } text-white shadow-xl text-lg relative overflow-hidden group`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-3 text-lg group-hover:translate-x-1 transition-transform" /> Send Message
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

      {/* Luxury decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-20 left-20 w-32 h-32 border-t-4 border-l-4 border-amber-400/20 rounded-tl-xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 2.2 }}
        className="absolute top-20 right-20 w-32 h-32 border-b-4 border-r-4 border-indigo-400/20 rounded-br-xl"
      />

      {/* Luxury signature */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.3 } : {}}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 right-10 text-gray-600 text-sm font-serif"
      >
        
      </motion.div>
    </section>
  );
};

export default Contact;
