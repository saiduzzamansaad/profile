import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useAnimation } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowRight, FaDribbble, FaBehance, FaFigma } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiThreedotjs } from 'react-icons/si';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import premiumDeveloperImage from '../assets/premiumDeveloperImage.png';

const PremiumHero = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const threeJsContainer = useRef(null);
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  
  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        transition: { duration: 0.8 }
      });
      
      // Floating animation for the image
      await controls.start({
        y: [0, -15, 0],
        transition: {
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    };
    
    sequence();
  }, [controls]);

  // Three.js initialization with enhanced effects
  useEffect(() => {
    if (!threeJsContainer.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    threeJsContainer.current.appendChild(renderer.domElement);

    // Bloom effect with mobile-optimized settings
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      isMobile ? 1.2 : 2.0, // Reduced bloom on mobile
      isMobile ? 0.4 : 0.6,
      isMobile ? 0.7 : 0.9
    );
    bloomPass.threshold = 0;
    bloomPass.strength = isMobile ? 1.2 : 2.0;
    bloomPass.radius = isMobile ? 0.6 : 0.8;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Particles with mobile-optimized count
    const particleCount = isMobile ? 800 : 1500;
    const particles = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    const colorArray = new Float32Array(particleCount * 3);

    // Create a torus knot for more interesting particle distribution
    const torusKnot = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
    const knotPositions = torusKnot.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      // Position - mix between random and torus knot distribution
      if (i < particleCount / 2) {
        // Use torus knot positions for some particles
        const knotIndex = Math.floor(Math.random() * (knotPositions.length / 3)) * 3;
        posArray[i * 3] = knotPositions[knotIndex] + (Math.random() - 0.5) * 2;
        posArray[i * 3 + 1] = knotPositions[knotIndex + 1] + (Math.random() - 0.5) * 2;
        posArray[i * 3 + 2] = knotPositions[knotIndex + 2] + (Math.random() - 0.5) * 2;
      } else {
        // Random positions for others
        posArray[i * 3] = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }

      // Size - smaller on mobile
      sizeArray[i] = Math.random() * (isMobile ? 0.05 : 0.1) + 0.02;

      // Color - gradient from blue to purple with some randomness
      const hue = 0.66 + (Math.random() - 0.5) * 0.1; // Blue-purple range
      const color = new THREE.Color().setHSL(
        hue,
        0.9,
        0.6 + Math.random() * 0.2
      );
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    particles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.03 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.7 : 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particleMesh = new THREE.Points(particles, particleMaterial);
    scene.add(particleMesh);

    // Floating spheres with mobile-optimized count
    const spheres = [];
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: isMobile ? 0.5 : 0.7,
      wireframe: true
    });

    const sphereCount = isMobile ? 5 : 8;
    for (let i = 0; i < sphereCount; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
      sphere.position.x = (Math.random() - 0.5) * 10;
      sphere.position.y = (Math.random() - 0.5) * 10;
      sphere.position.z = (Math.random() - 0.5) * 10;
      sphere.userData = {
        speed: Math.random() * 0.002 + 0.001,
        amplitude: Math.random() * 3 + 2,
        rotationSpeed: Math.random() * 0.02 + 0.01,
        offset: Math.random() * Math.PI * 2
      };
      spheres.push(sphere);
      scene.add(sphere);
    }

    // Add floating tech icons in 3D space (only on desktop)
    if (!isMobile) {
      const fontLoader = new FontLoader();
      fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const techWords = ['DEV', 'CODE', 'UI/UX', 'WEB'];
        
        techWords.forEach((word, idx) => {
          const textGeometry = new TextGeometry(word, {
            font: font,
            size: 0.4,
            height: 0.05,
            curveSegments: 8,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.01,
            bevelOffset: 0,
            bevelSegments: 3
          });
          
          textGeometry.center();
          
          const textMaterial = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setHSL(0.66, 0.8, 0.7),
            transparent: true,
            opacity: 0.15,
            wireframe: true
          });
          
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.x = (Math.random() - 0.5) * 15;
          textMesh.position.y = (Math.random() - 0.5) * 10;
          textMesh.position.z = (Math.random() - 0.5) * 15;
          textMesh.userData = {
            speed: Math.random() * 0.001 + 0.0005,
            rotationSpeed: Math.random() * 0.01 + 0.005
          };
          scene.add(textMesh);
          spheres.push(textMesh);
        });
      });
    }

    // Camera animation
    camera.position.z = isMobile ? 10 : 8;
    const cameraTarget = new THREE.Vector3(0, 0, 0);

    // Animation loop with optimized performance
    let lastTime = 0;
    const animate = (time) => {
      requestAnimationFrame(animate);
      
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Smooth camera movement
      camera.position.x += (Math.sin(time * 0.0005) * 0.1 - camera.position.x) * 0.05;
      camera.position.y += (Math.cos(time * 0.0007) * 0.1 - camera.position.y) * 0.05;
      camera.lookAt(cameraTarget);

      // Particle system animation
      particleMesh.rotation.x += 0.0002 * deltaTime;
      particleMesh.rotation.y += 0.0003 * deltaTime;

      // Animate spheres with individual properties
      spheres.forEach((sphere, i) => {
        const { speed, amplitude, rotationSpeed, offset } = sphere.userData;
        if (rotationSpeed) {
          sphere.rotation.x += rotationSpeed * deltaTime;
          sphere.rotation.y += rotationSpeed * deltaTime;
        }
        if (speed && amplitude) {
          sphere.position.x = Math.sin(time * speed * (i + 1) + offset) * amplitude;
          sphere.position.y = Math.cos(time * speed * (i + 1) + offset) * amplitude;
        }
      });

      composer.render();
    };

    animate();

    // Handle resize with debounce
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeJsContainer.current && renderer.domElement) {
        threeJsContainer.current.removeChild(renderer.domElement);
      }
    };
  }, [isMobile]);

  const socialLinks = [
    { icon: <FaLinkedin className="text-lg" />, label: 'LinkedIn', url: '#', color: 'bg-blue-700' },
    { icon: <FaGithub className="text-lg" />, label: 'GitHub', url: '#', color: 'bg-gray-900' },
    { icon: <HiOutlineMail className="text-lg" />, label: 'Email', url: '#', color: 'bg-red-600' },
    { icon: <FaDribbble className="text-lg" />, label: 'Dribbble', url: '#', color: 'bg-pink-600' },
    { icon: <FaBehance className="text-lg" />, label: 'Behance', url: '#', color: 'bg-blue-600' },
    { icon: <FaFigma className="text-lg" />, label: 'Figma', url: '#', color: 'bg-purple-600' },
  ];

  const techIcons = [
    { icon: <SiReact className="text-2xl text-cyan-500" />, label: 'React' },
    { icon: <SiTypescript className="text-2xl text-blue-600" />, label: 'TypeScript' },
    { icon: <SiNextdotjs className="text-2xl text-black dark:text-white" />, label: 'Next.js' },
    { icon: <SiTailwindcss className="text-2xl text-cyan-400" />, label: 'Tailwind CSS' },
    { icon: <SiNodedotjs className="text-2xl text-green-600" />, label: 'Node.js' },
    { icon: <SiThreedotjs className="text-2xl text-gray-200" />, label: 'Three.js' },
  ];

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center relative overflow-hidden">
      {/* Three.js Background */}
      <div 
        ref={threeJsContainer} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Luxury background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated grid pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNwYXR0ZXJuKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        
        {/* Floating light spots */}
        {[...Array(isMobile ? 3 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 filter blur-xl`}
            initial={{
              width: `${Math.random() * (isMobile ? 100 : 200) + (isMobile ? 50 : 100)}px`,
              height: `${Math.random() * (isMobile ? 100 : 200) + (isMobile ? 50 : 100)}px`,
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0
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
              ease: "linear"
            }}
          />
        ))}
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
            <motion.div
              variants={itemVariants}
              className="mb-4 md:mb-6"
            >
              <span className="text-blue-400 font-medium tracking-wider uppercase text-xs sm:text-sm inline-flex items-center">
                <motion.span 
                  className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                Senior Web Developer
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 md:mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 1,
                    textShadow: "0 0 10px rgba(79, 70, 229, 0.5)"
                  }}
                  transition={{ delay: 0.4 }}
                >
                  MD.SAIDUZZAMAN
                </motion.span>
              </span>{' '}
              <motion.span 
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  textShadow: "0 0 8px rgba(255, 255, 255, 0.3)"
                }}
                transition={{ delay: 0.6 }}
              >
                SAAD
              </motion.span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="mb-6 md:mb-8"
            >
              <motion.div 
                className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-3 sm:mb-4"
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
                I build modern, fast, and user-friendly web applications from front to back.
From stunning interfaces to powerful backends — I handle it all.

              </motion.p>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-6 md:mb-10 max-w-lg leading-relaxed font-light text-sm sm:text-base"
            >
              With over <motion.span 
                className="text-blue-400 font-medium"
                animate={{
                  textShadow: "0 0 8px rgba(79, 70, 229, 0.5)"
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2
                }}
              >{rounded}</motion.span> years of experience,Specialized in SaaS tools, automation, and custom business solutions.
Let’s turn your idea into a fully functional, high-performance product.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-16"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium flex items-center gap-2 md:gap-3 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <span className="relative z-10 text-sm md:text-base">Explore Portfolio</span>
                <motion.span
                  className="relative z-10"
                  animate={{ 
                    x: [0, 4, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <FaArrowRight className="text-sm md:text-base" />
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.button>

              <motion.button
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)"
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
                      stiffness: 300
                    }}
                    whileHover={{ 
                      y: -5,
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 }
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
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    />
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
                    transition: { duration: 0.5 }
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
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 relative flex justify-center"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              {/* Animated decorative elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl sm:rounded-3xl transform rotate-2"
              ></motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -inset-3 sm:-inset-5 md:-inset-6 bg-gradient-to-br from-blue-800/20 to-purple-800/20 rounded-xl sm:rounded-2xl transform -rotate-1"
              ></motion.div>
              
              {/* Main image container with parallax effect */}
              <motion.div
                whileHover={{ 
                  scale: 1.01,
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden rounded-lg md:rounded-xl shadow-2xl border-4 border-gray-800/50"
                animate={controls}
              >
                {/* Image with dynamic hover effect */}
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.5 }
                  }}
                  className="overflow-hidden"
                >
                  <img 
                    src={premiumDeveloperImage} 
                    alt="Alexander Montgomery" 
                    className="w-full h-auto object-cover grayscale-[15%] contrast-105 hover:grayscale-0 hover:contrast-110 transition-all duration-500"
                  />
                </motion.div>
                
                {/* Animated glow effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none"
                ></motion.div>
                
                {/* Floating experience badge with bounce animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ 
                    delay: 1.4,
                    rotate: { 
                      repeat: Infinity, 
                      repeatType: "reverse",
                      duration: 4 
                    }
                  }}
                  className="absolute -top-4 -left-4 sm:-top-5 sm:-left-5 md:-top-6 md:-left-6 bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-full shadow-xl flex items-center backdrop-blur-sm z-10"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full mr-2"
                  ></motion.div>
                  <span className="font-medium text-white text-xs sm:text-sm">5+ Years Exp</span>
                </motion.div>
                
                {/* Client badge with floating animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    delay: 1.6, 
                    type: "spring",
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  }}
                  className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-white/95 px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-full shadow-xl flex items-center backdrop-blur-sm border border-gray-200/30 z-10"
                >
                  <div className="flex -space-x-1 sm:-space-x-2 mr-2 sm:mr-3">
                    {[1, 2, 3].map((item) => (
                      <motion.div 
                        key={item}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: 1,
                          y: [0, -5, 0],
                        }}
                        transition={{ 
                          delay: 1.8 + item * 0.1,
                          y: {
                            duration: 2 + item * 0.5,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }
                        }}
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-200 border-2 border-white"
                      ></motion.div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Worked with</p>
                    <p className="font-medium text-gray-800 text-xs sm:text-sm">50+ Clients</p>
                  </div>
                </motion.div>
                
                {/* Floating project counter with pulse animation */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.7)", "0 0 0 10px rgba(74, 222, 128, 0)"]
                  }}
                  transition={{ 
                    delay: 2,
                    boxShadow: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }}
                  className="absolute -left-4 bottom-16 sm:-left-5 sm:bottom-20 bg-gray-900/80 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg border border-gray-700/50 z-10"
                >
                  <div className="flex items-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-1 sm:mr-2"
                    ></motion.div>
                    <span className="text-white text-xs sm:text-sm font-medium">120+ Projects</span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Animated decorative corner elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: 360
                }}
                transition={{ 
                  delay: 1.2,
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 border-t-4 border-r-4 border-blue-400 rounded-tr-xl"
              ></motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotate: -360
                }}
                transition={{ 
                  delay: 1.4,
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
                className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 border-b-4 border-l-4 border-purple-400 rounded-bl-xl"
              ></motion.div>

              {/* Floating tech bubbles - only on desktop */}
              {!isMobile && [1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    y: [0, -20, 0],
                    x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0]
                  }}
                  transition={{
                    delay: 1.5 + i * 0.3,
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className={`absolute ${i === 1 ? 'top-6 -left-6 w-5 h-5' : i === 2 ? 'top-1/2 -right-8 w-6 h-6' : 'bottom-16 -left-8 w-4 h-4'} rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30`}
                ></motion.div>
              ))}
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
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
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
              repeat: Infinity
            }}
          >
            <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M12 1V10M12 39V30M12 10L7 5M12 10L17 5M12 30L7 35M12 30L17 35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  pathLength: [0.5, 1, 0.5],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <motion.path
                d="M12 15V25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
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
