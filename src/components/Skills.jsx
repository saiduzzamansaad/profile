import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs,
  FaGitAlt, FaFigma, FaDatabase, FaAws, FaSass,
  FaDocker, FaPython, FaJava, FaPhp, FaNpm
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiMongodb, SiTypescript, SiNextdotjs, 
  SiGraphql, SiJest, SiRedux, SiExpress, SiPostgresql,
  SiFirebase, SiVercel, SiNetlify, SiJquery, SiWebpack,
  SiBootstrap, SiStorybook, SiCypress
} from 'react-icons/si';
import { TbBrandThreejs, TbBrandReactNative } from 'react-icons/tb';

const Skills = () => {
  const ref = useRef(null);
  const threeJsContainer = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
      1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0;
    bloomPass.strength = 1.5;
    bloomPass.radius = 0.5;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Particles with modern tech colors
    const particleCount = isMobile ? 800 : 1500;
    const particles = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const sizeArray = new Float32Array(particleCount);
    const colorArray = new Float32Array(particleCount * 3);

    // Modern tech color palette
    const colors = [
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0xf43f5e), // Rose
      new THREE.Color(0x10b981), // Emerald
      new THREE.Color(0x0ea5e9), // Sky
    ];

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 20;

      sizeArray[i] = Math.random() * 0.1 + 0.02;

      const color = colors[Math.floor(Math.random() * colors.length)];
      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    particles.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particleMesh = new THREE.Points(particles, particleMaterial);
    scene.add(particleMesh);

    // Floating tech symbols
    const fontLoader = new FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
      const techSymbols = ['{}', '()', '[]', '</>', '=>', '{}'];
      
      techSymbols.forEach((symbol, idx) => {
        const textGeometry = new TextGeometry(symbol, {
          font: font,
          size: 0.5,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.02,
          bevelOffset: 0,
          bevelSegments: 5
        });
        
        textGeometry.center();
        
        const textMaterial = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.2,
          wireframe: true
        });
        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = (Math.random() - 0.5) * 15;
        textMesh.position.y = (Math.random() - 0.5) * 10;
        textMesh.position.z = (Math.random() - 0.5) * 15;
        scene.add(textMesh);
      });
    });

    // Camera position
    camera.position.z = 8;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      particleMesh.rotation.x += 0.0005;
      particleMesh.rotation.y += 0.0005;

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
      threeJsContainer.current?.removeChild(renderer.domElement);
    };
  }, [isInView, isMobile]);

  const skillsCategories = [
    {
      title: "Frontend",
      skills: [
        { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <FaCss3Alt />, color: '#2965F1' },
        { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
        { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
        { name: 'React Native', icon: <TbBrandReactNative />, color: '#61DAFB' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#38BDF8' },
        { name: 'Bootstrap', icon: <SiBootstrap />, color: '#7952B3' },
        { name: 'jQuery', icon: <SiJquery />, color: '#0769AD' },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, color: '#68A063' },
        { name: 'Express', icon: <SiExpress />, color: '#000000' },
        { name: 'Python', icon: <FaPython />, color: '#3776AB' },
        { name: 'Java', icon: <FaJava />, color: '#007396' },
        { name: 'PHP', icon: <FaPhp />, color: '#777BB4' },
      ]
    },
    {
      title: "Database",
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
        { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Vercel', icon: <SiVercel />, color: '#000000' },
        { name: 'Netlify', icon: <SiNetlify />, color: '#00C7B7' },
        { name: 'NPM', icon: <FaNpm />, color: '#CB3837' },
        { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9' },
      ]
    },
    {
      title: "Testing & Design",
      skills: [
        { name: 'Jest', icon: <SiJest />, color: '#C21325' },
        { name: 'Cypress', icon: <SiCypress />, color: '#17202C' },
        { name: 'Storybook', icon: <SiStorybook />, color: '#FF4785' },
        { name: 'Figma', icon: <FaFigma />, color: '#A259FF' },
      ]
    },
    {
      title: "Other",
      skills: [
        { name: 'GraphQL', icon: <SiGraphql />, color: '#E535AB' },
        { name: 'Three.js', icon: <TbBrandThreejs />, color: '#049EF4' },
        { name: 'Sass', icon: <FaSass />, color: '#CC6699' },
      ]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

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

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="skills" ref={ref}>
      {/* Three.js Background */}
      <div 
        ref={threeJsContainer} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 mb-4"
          >
            Technical Skills
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Comprehensive toolkit for building modern, scalable web applications
          </motion.p>
        </div>

        {/* Skills Categories */}
        <div className="space-y-8">
          {skillsCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={categoryVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.skills[0].color }} />
                {category.title}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={item}
                    whileHover={{ 
                      y: -5,
                      scale: 1.05,
                      boxShadow: `0 10px 20px -5px ${skill.color}40`
                    }}
                    className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-transparent transition-all duration-300"
                  >
                    <div 
                      className="text-3xl md:text-4xl mb-3 transition-transform duration-300"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm md:text-base text-center">{skill.name}</h3>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials with floating animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl mr-4">👨‍💻</div>
              <div>
                <p className="font-bold text-lg">Sarah Johnson</p>
                <p className="text-indigo-100">CTO at TechCorp</p>
              </div>
            </div>
            <blockquote className="text-lg italic mb-6">
              "John delivered exceptional results on our project, with clean code and great attention to detail. His React expertise helped us build a performant frontend."
            </blockquote>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Performance'].map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl p-8 text-white shadow-xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl mr-4">👩‍💼</div>
              <div>
                <p className="font-bold text-lg">Michael Chen</p>
                <p className="text-gray-300">Product Manager at StartupX</p>
              </div>
            </div>
            <blockquote className="text-lg italic mb-6">
              "The full-stack solution John built scaled perfectly with our growing user base. His Node.js backend architecture was particularly impressive."
            </blockquote>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Scalability', 'Database'].map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;