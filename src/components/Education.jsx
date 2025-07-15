"use client"

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaUniversity, FaAward, FaCloud, FaServer, FaPalette, FaCode } from "react-icons/fa";
import { IoIosSchool, IoIosRocket } from "react-icons/io";
import { GiAbstract024 } from "react-icons/gi";
import { BsWordpress } from "react-icons/bs";
import { DiJavascript, DiWordpress } from "react-icons/di";
import { RiJavascriptFill } from "react-icons/ri";
import { Fullscreen } from "lucide-react";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const EducationSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax effects with spring physics
  const y1 = useSpring(useParallax(scrollYProgress, 300), { stiffness: 150, damping: 30 });
  const y2 = useSpring(useParallax(scrollYProgress, 200), { stiffness: 120, damping: 25 });
  const y3 = useSpring(useParallax(scrollYProgress, 150), { stiffness: 100, damping: 20 });
  
  // Premium spring animations
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  // Advanced transforms with smooth interpolation
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Education data with enhanced details
  const educationData = [
    {
      id: 1,
      degree: "Junior School Certificate",
      institution: "Sylhet Govt. Pilot High School",
      year: "2017 - 2018",
      description: "JSC in Science is a foundational public exam in Bangladesh that assesses students' basic knowledge in science subjects at the junior level.",
      icon: <FaGraduationCap className="text-2xl" />,
      color: "from-purple-600 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
      highlights: ["4.60 GPA", "Science", ],
      tags: ["Science ", "Math", "Physics",]
    },
    {
      id: 2,
      degree: "Secondary School Certificate In CST",
      institution: "Sylhet Technical School And College",
      year: "2018 - 2020",
      description: "Sylhet Technical School and College (STSC) in the Computer Science and Technology (CST) department offers hands-on technical education in computing and software development.",
      icon: <FaUniversity className="text-2xl" />,
      color: "from-blue-600 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
      highlights: ["4.07 GPA", "CST", "Science"],
      tags: ["Microsoft office", "Basic Computer", "Math"]
    },
    {
      id: 3,
      degree: "Diploma In Computer Science And Technology",
      institution: "Sylhet Polytechnic Institute ",
      year: "2021 - 2025",
      description: "Diploma in CST (Computer Science and Technology) is a technical education program that teaches computer programming, hardware, networking, and software development skills.",
      icon: <IoIosSchool className="text-2xl" />,
      color: "from-orange-600 to-yellow-500",
      bgColor: "bg-gradient-to-br from-orange-900/20 to-yellow-900/20",
      highlights: ["Best in Class", "Design Award", "Industry Partnership"],
      tags: ["Javascript", "React", "Python", "Node.js"]
    },
    
  ];

  // Certification data
  const certifications = [
    { 
      name: "Wordpress Developer", 
      year: "2021", 
      color: "from-orange-500 to-red-500",
      icon: <BsWordpress className="text-xl" />,
      issuer: "Themes, Plugins",
      level: "Professional"
    },
    { 
      name: "FrontEnd Developer", 
      year: "2022", 
      color: "from-blue-500 to-cyan-500",
      icon: <RiJavascriptFill className="text-xl" />,
      issuer: "Javascript",
      level: "Professional"
    },
    { 
      name: "BackEnd Developer", 
      year: "2024", 
      color: "from-green-500 to-teal-500",
      icon: <FaPalette className="text-xl" />,
      issuer: "Node.js",
      level: "Expert"
    },
    { 
      name: "Full Stack Developer", 
      year: "2025", 
      color: "from-green-500 to-teal-500",
      icon: <Fullscreen className="text-xl" />,
      issuer: "MERN STACK",
      level: "Expert"
    },
    
  ];

  return (
    <div className="min-h-screen w-full bg-[#020617] relative overflow-hidden">
      {/* Premium Particle Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              background: `rgba(${Math.random() > 0.5 ? 168 : 236}, 85, 247, ${Math.random() * 0.2})`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.1]),
        }}
      />

      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[100px]"
        style={{ 
          y: y1,
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
        }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-[80px]"
        style={{ 
          y: y2,
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.1])
        }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-gradient-to-r from-orange-500/10 to-yellow-500/10 blur-[60px]"
        style={{ 
          y: y3,
          rotate,
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
        }}
      />

      {/* Progress Indicator */}
      <motion.div 
        className="fixed left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 top-0 z-50 origin-left"
        style={{ 
          scaleX: useSpring(scrollYProgress, { stiffness: 150, damping: 30 }),
          boxShadow: "0 0 15px rgba(236,72,153,0.5)"
        }}
      />

      <motion.section 
        ref={containerRef}
        style={{ opacity, scale }}
        className="relative py-32 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Premium Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-24"
          >
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 backdrop-blur-sm mb-8"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 30px rgba(168,85,247,0.4)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-4"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              />
              <span className="text-purple-300 text-base font-medium tracking-wider">
                ACADEMIC JOURNEY
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent mb-6"
              style={{ 
                y: textY,
                opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1])
              }}
            >
              Education & Credentials
            </motion.h2>
            
            <motion.div 
              className="w-32 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 mx-auto rounded-full mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ 
                scaleX: 1,
                transition: { 
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1] 
                } 
              }}
            />
            
            <motion.p 
              className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              style={{ 
                y: useTransform(scrollYProgress, [0, 1], [0, 50]),
                opacity: useTransform(scrollYProgress, [0, 0.4], [0, 1])
              }}
            >
              My comprehensive academic foundation and professional certifications that power my expertise in cutting-edge technology solutions and innovative design.
            </motion.p>
          </motion.div>

          {/* Enhanced Timeline */}
          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div 
              className="absolute left-1/2 w-0.5 bg-gradient-to-b from-purple-600/30 via-pink-600/60 to-orange-500/30 -translate-x-1/2 rounded-full"
              style={{ 
                height: useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]),
                boxShadow: "0 0 25px rgba(168,85,247,0.5)"
              }}
            />

            {/* Education Items */}
            <div className="space-y-24">
              <AnimatePresence>
                {educationData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.8, 
                        delay: index * 0.15,
                        ease: [0.16, 1, 0.3, 1]
                      }
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center justify-between`}
                  >
                    {/* Content Card */}
                    <motion.div
                      className={`w-full max-w-xl ${index % 2 === 0 ? 'mr-auto pr-8 lg:pr-20' : 'ml-auto pl-8 lg:pl-20'}`}
                      whileHover={{ 
                        y: -10,
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                    >
                      <div className={`relative p-0.5 rounded-2xl bg-gradient-to-br ${item.color} shadow-xl`}>
                        <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 relative overflow-hidden">
                          {/* Animated Card Background */}
                          <motion.div 
                            className={`absolute inset-0 ${item.bgColor} opacity-20`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.2 }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                          
                          <div className="relative z-10">
                            <div className="flex items-start gap-6 mb-6">
                              <motion.div 
                                className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                                whileHover={{ 
                                  rotate: 360,
                                  scale: 1.1,
                                  transition: { duration: 0.6 }
                                }}
                              >
                                {item.icon}
                              </motion.div>
                              <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.degree}</h3>
                                <p className="text-purple-300 font-medium text-lg">{item.institution}</p>
                              </div>
                            </div>
                            
                            <p className="text-gray-300 mb-6 text-lg leading-relaxed">{item.description}</p>
                            
                            {/* Highlights */}
                            <div className="flex flex-wrap gap-3 mb-6">
                              {item.highlights.map((highlight, i) => (
                                <motion.div
                                  key={i}
                                  className="px-3 py-1 rounded-full bg-gray-800/80 border border-gray-700/50 text-sm text-gray-200"
                                  whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: "rgba(31,41,55,0.9)"
                                  }}
                                >
                                  {highlight}
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {item.tags.map((tag, i) => (
                                <motion.div
                                  key={i}
                                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-purple-900/40 to-pink-900/40 text-xs text-purple-200"
                                  whileHover={{ 
                                    scale: 1.1,
                                    transition: { duration: 0.2 }
                                  }}
                                >
                                  {tag}
                                </motion.div>
                              ))}
                            </div>
                            
                            <motion.div 
                              className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-gray-800/80 border border-gray-600/50 backdrop-blur-sm"
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: "rgba(31,41,55,0.9)",
                                boxShadow: "0 5px 15px rgba(168,85,247,0.2)"
                              }}
                            >
                              <span className="text-gray-300 font-medium">{item.year}</span>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Timeline Dot */}
                    <motion.div 
                      className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center border-4 border-gray-900 z-20 shadow-lg"
                      whileHover={{ 
                        scale: 1.3,
                        transition: { duration: 0.3 }
                      }}
                      animate={{ 
                        boxShadow: ["0 0 0 0 rgba(168,85,247,0.4)", "0 0 20px 10px rgba(168,85,247,0.2)", "0 0 0 0 rgba(168,85,247,0.4)"]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </motion.div>

                    {/* Empty Space */}
                    <div className="hidden lg:block w-full max-w-xl"></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Premium Certifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-40"
          >
            <motion.h3 
              className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent"
              style={{ 
                y: useTransform(scrollYProgress, [0, 1], [0, -40]),
                opacity: useTransform(scrollYProgress, [0.5, 0.8], [0, 1])
              }}
            >
              Professional Certifications
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 60, scale: 0.9 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6, 
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }}
                  whileHover={{ 
                    y: -15, 
                    boxShadow: "0 25px 50px -12px rgba(168,85,247,0.25)",
                    transition: { duration: 0.4 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative"
                >
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden">
                    {/* Animated Background */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${cert.color}/5 opacity-0 group-hover:opacity-100`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.1, 0] }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                    
                    <div className="relative z-10 h-full flex flex-col">
                      <motion.div 
                        className={`w-14 h-14 bg-gradient-to-r ${cert.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                        whileHover={{ 
                          rotate: 360,
                          transition: { duration: 0.6 }
                        }}
                      >
                        {cert.icon}
                      </motion.div>
                      
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {cert.name}
                      </h4>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-gray-400 text-sm">{cert.issuer}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-purple-300">{cert.level}</span>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-700/50 flex items-center justify-between">
                        <span className="text-gray-300 text-sm font-medium">Issued {cert.year}</span>
                        <motion.div
                          className="flex items-center"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-xs text-purple-300 mr-2">Verified</span>
                          <motion.div
                            className="w-2 h-2 bg-green-400 rounded-full"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.2,
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating CTA */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="mt-24 text-center"
            >
              <motion.button
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-lg shadow-lg relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(236,72,153,0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <IoIosRocket className="text-xl" />
                  View Full Credentials
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Abstract Shapes */}
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 opacity-10"
          animate={{
            rotate: 360,
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <GiAbstract024 className="w-full h-full text-purple-500" />
        </motion.div>
      </motion.section>
    </div>
  );
};

export default EducationSection;
