import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSend, FiMail, FiUser, FiMessageSquare, FiMapPin, FiPhone } from 'react-icons/fi';
import { useState } from 'react';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const inputAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const floatingShapes = [
    { top: '10%', left: '5%', size: 'w-16 h-16', color: 'bg-pink-600/20', animation: { y: [0, -15, 0], duration: 8 } },
    { top: '70%', left: '3%', size: 'w-10 h-10', color: 'bg-blue-600/20', animation: { y: [0, 20, 0], duration: 10 } },
    { top: '30%', right: '8%', size: 'w-12 h-12', color: 'bg-purple-600/20', animation: { y: [0, -25, 0], duration: 12 } },
    { top: '85%', right: '5%', size: 'w-8 h-8', color: 'bg-cyan-600/20', animation: { y: [0, 15, 0], duration: 9 } }
  ];

  return (
    <section id="contact" className="w-full py-24 bg-gradient-to-b from-[#0a0e17] to-[#0a192f] relative overflow-hidden">
      {/* Floating animated shapes */}
      {floatingShapes.map((shape, index) => (
        <motion.div
          key={index}
          initial={{ y: 0 }}
          animate={{ y: shape.animation.y }}
          transition={{
            duration: shape.animation.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute rounded-full filter blur-md ${shape.size} ${shape.color}`}
          style={{ top: shape.top, left: shape.left, right: shape.right }}
        />
      ))}

      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.05, x: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-0 text-[100px] md:text-[220px] font-bold text-gray-500 opacity-10 tracking-tighter"
      >
        LET'S TALK
      </motion.div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-center h-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="pb-16 text-center"
        >
          <p className="text-5xl md:text-6xl font-bold inline-block relative text-gray-100 mb-6">
            <span className="relative">
              Get In Touch
              <motion.span 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-purple-600 origin-left"
              />
            </span>
          </p>
          <p className="py-4 text-gray-300 max-w-[700px] mx-auto text-lg md:text-xl leading-relaxed">
            Have a project in mind or want to discuss potential opportunities? 
            Feel free to reach out through the form or connect with me directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10"
          >
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-start space-x-6 p-6 bg-[#112240]/30 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-pink-600/30 transition-all"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-600/20 to-pink-600/10 text-pink-400 flex-shrink-0">
                <FiMail className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Email Me</h3>
                <p className="text-gray-400 hover:text-pink-400 transition-colors text-lg">
                  <a href="mailto:email@example.com">saiduzzaman113@gmail.com</a>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-start space-x-6 p-6 bg-[#112240]/30 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-blue-600/30 transition-all"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-600/10 text-blue-400 flex-shrink-0">
                <FiPhone className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Call Me</h3>
                <p className="text-gray-400 hover:text-blue-400 transition-colors text-lg">
                  <a href="tel:+1234567890">+8801788637109</a>
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-start space-x-6 p-6 bg-[#112240]/30 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-purple-600/30 transition-all"
            >
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-600/20 to-purple-600/10 text-purple-400 flex-shrink-0">
                <FiMapPin className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">Location</h3>
                <p className="text-gray-400 text-lg">Sylhet, Bangladesh</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-[#112240]/30 backdrop-blur-sm p-10 rounded-2xl border border-gray-800/50 shadow-2xl relative overflow-hidden"
          >
            {/* Form background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-pink-600 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-blue-600 rounded-bl-2xl"></div>
            </div>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-600/20 to-green-600/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-100 mb-4">Message Sent!</h3>
                <p className="text-gray-300 text-lg max-w-md mx-auto">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 px-8 py-3 rounded-lg font-medium bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-200 border border-gray-700 transition-all"
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                <motion.div
                  variants={inputAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={0}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                    <FiUser className="mr-2 text-pink-400" /> Your Name
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                    className="w-full px-5 py-4 bg-[#0a192f]/70 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-600/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-pink-400 text-sm mt-2">{errors.name.message}</p>}
                </motion.div>

                <motion.div
                  variants={inputAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={1}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                    <FiMail className="mr-2 text-blue-400" /> Email Address
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
                    className="w-full px-5 py-4 bg-[#0a192f]/70 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-pink-400 text-sm mt-2">{errors.email.message}</p>}
                </motion.div>

                <motion.div
                  variants={inputAnimation}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={2}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3 flex items-center">
                    <FiMessageSquare className="mr-2 text-purple-400" /> Your Message
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
                    className="w-full px-5 py-4 bg-[#0a192f]/70 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/50 focus:border-transparent text-gray-200 placeholder-gray-500 transition-all"
                    placeholder="Hello, I'd like to talk about..."
                  ></textarea>
                  {errors.message && <p className="text-pink-400 text-sm mt-2">{errors.message.message}</p>}
                </motion.div>

                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className={`flex items-center justify-center w-full py-4 px-6 rounded-xl font-medium transition-all ${
                    isLoading 
                      ? 'bg-pink-700/70 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500'
                  } text-white shadow-lg text-lg`}
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
                      <FiSend className="mr-3 text-lg" /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
