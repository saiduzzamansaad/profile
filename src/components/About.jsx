import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const About = () => {
  const ref = useRef(null);
  const threeJsContainer = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
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

  // Three.js initialization
  useEffect(() => {
    if (!threeJsContainer.current || !isInView) return;

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

    // Bloom effect
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      isMobile ? 1.2 : 1.5,
      isMobile ? 0.4 : 0.6,
      isMobile ? 0.7 : 0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = isMobile ? 1.2 : 1.5;
    bloomPass.radius = isMobile ? 0.5 : 0.7;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Particles with tech-themed colors
    const particleCount = isMobile ? 600 : 1200;
    const particles = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    const colorArray = new Float32Array(particleCount * 3);

    // Tech-themed colors (blues, purples, cyans)
    const colors = [
      new THREE.Color(0x4f46e5), // Indigo
      new THREE.Color(0x818cf8), // Light indigo
      new THREE.Color(0x60a5fa), // Blue
      new THREE.Color(0x38bdf8), // Light blue
      new THREE.Color(0x22d3ee), // Cyan
      new THREE.Color(0xa78bfa), // Purple
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position
      posArray[i * 3] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Size
      sizeArray[i] = Math.random() * (isMobile ? 0.05 : 0.08) + 0.02;

      // Color - pick from tech-themed colors
      const color = colors[Math.floor(Math.random() * colors.length)].clone();
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

    // Floating tech icons in 3D (only on desktop)
    if (!isMobile) {
      const fontLoader = new FontLoader();
      fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const techSymbols = ['{}', '()', '[]', '</>', '=>', '{}'];
        
        techSymbols.forEach((symbol, idx) => {
          const textGeometry = new TextGeometry(symbol, {
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
        });
      });
    }

    // Camera position
    camera.position.z = isMobile ? 12 : 8;
    const cameraTarget = new THREE.Vector3(0, 0, 0);

    // Animation loop
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

      composer.render();
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (threeJsContainer.current && renderer.domElement) {
        threeJsContainer.current.removeChild(renderer.domElement);
      }
    };
  }, [isInView, isMobile]);

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants2 = {
    initial: { y: 0 },
    animate: {
      y: [0, 20, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

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

  return (
    <section 
      id="about" 
      className="w-full py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#0f1c32] to-[#112240]"
      ref={ref}
    >
      {/* Three.js Background */}
      <div 
        ref={threeJsContainer} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
      >
        <motion.div
          variants={floatingVariants}
          initial="initial"
          animate="animate"
          className="absolute top-1/4 left-1/4 w-24 md:w-32 h-24 md:h-32 rounded-full bg-pink-600 blur-[60px] md:blur-[80px] opacity-20 md:opacity-30"
        />
        <motion.div
          variants={floatingVariants2}
          initial="initial"
          animate="animate"
          className="absolute bottom-1/3 right-1/4 w-28 md:w-40 h-28 md:h-40 rounded-full bg-blue-600 blur-[70px] md:blur-[90px] opacity-20 md:opacity-30"
        />
        <div className="absolute top-1/3 right-1/3 w-20 md:w-24 h-20 md:h-24 rounded-full bg-purple-600 blur-[50px] md:blur-[70px] opacity-15 md:opacity-20" />
      </motion.div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjIwIiBjeT0iMjAiIHI9IjEiLz48L2c+PC9zdmc+')]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="pb-12 md:pb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400 inline-block">
            About Me
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-pink-600 to-blue-500 mt-3 md:mt-4 w-24 md:w-32 mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-pink-600 to-blue-600 rounded-xl md:rounded-2xl opacity-20 blur-lg md:blur-xl"></div>
            <div className="relative bg-[#112240]/70 backdrop-blur-sm border border-gray-800 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-xl md:shadow-2xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ccd6f6] leading-tight"
              >
                <p>Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">MD.SAIDUZZAMAN SAAD</span></p>
                <p className="mt-3 md:mt-4 text-xl sm:text-2xl md:text-3xl text-gray-400">Full Stack Developer</p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4"
              >
                {[
                  { icon: '👨‍💻', label: '5+ Years Exp' },
                  { icon: '🚀', label: '50+ Projects' },
                  { icon: '🌐', label: 'Full Stack' },
                  { icon: '📱', label: 'Mobile First' },
                  { icon: '⚡', label: 'Fast Load' },
                  { icon: '🔒', label: 'Secure Code' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={textVariants}
                    className="flex items-center space-x-2 bg-[#0a192f]/50 p-2 md:p-3 rounded-lg border border-gray-800 text-sm md:text-base"
                  >
                    <span className="text-lg md:text-xl">{item.icon}</span>
                    <span className="text-gray-300">{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-4 md:space-y-6 text-[#8892b0] text-base md:text-lg"
          >
            <motion.p
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              I'm a passionate <span className="text-pink-400 font-medium">Full Stack Developer</span> specializing in modern JavaScript frameworks. With expertise in <span className="text-blue-400 font-medium">React, Node.js, and TypeScript</span>, I build performant, scalable web applications with intuitive user interfaces.
            </motion.p>

            <motion.p
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-3 md:mt-4"
            >
              My approach combines <span className="text-purple-400 font-medium">clean code architecture</span> with <span className="text-cyan-400 font-medium">responsive design principles</span>. I'm committed to writing efficient, maintainable code and creating seamless user experiences across all devices.
            </motion.p>

            <motion.p
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-3 md:mt-4"
            >
              Currently focused on <span className="text-green-400 font-medium">performance optimization</span> and <span className="text-yellow-400 font-medium">accessibility best practices</span>. When not coding, I contribute to open-source projects and stay updated with the latest web technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="pt-4 md:pt-6"
            >
              <div className="flex flex-wrap gap-2 md:gap-3">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'MongoDB', 'Tailwind', 'AWS'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="px-3 py-1 md:px-4 md:py-2 bg-[#112240] border border-gray-800 rounded-full text-gray-300 text-xs md:text-sm font-medium shadow-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
