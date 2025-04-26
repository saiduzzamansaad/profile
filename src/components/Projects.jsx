import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLayers, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineExternalLink } from 'react-icons/hi';

// Product images (replace with your actual project images)
import project1 from '../assets/project1.png';
// import TaskManagerImage from './images/task-manager.jpg';
// import WeatherAppImage from './images/weather-app.jpg';
// import AIContentImage from './images/ai-content.jpg';

// Simplified Laptop Model Component
function LaptopModel({ screenContent }) {
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');

  return (
    <group position={[0, -0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
      <mesh geometry={nodes.Circle001.geometry} material={materials['Keyboard.001']} />
      <mesh geometry={nodes.Circle001_1.geometry} material={materials.Keyboard} />
      <mesh geometry={nodes.Circle001_2.geometry} material={materials.KeyLight} />
      <mesh geometry={nodes.Circle001_3.geometry} material={materials.Touchbar} />
      <group position={[0, -0.1, 1.51]} rotation={[0.1, 0, 0]}>
        {screenContent && (
          <Html
            transform
            distanceFactor={1.17}
            position={[0, 0, 0.01]}
            rotation-x={-0.1}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'none'
            }}
          >
            {screenContent}
          </Html>
        )}
      </group>
    </group>
  );
}

// Project Modal Component
const ProjectModal = ({ project, onClose, onNext, onPrev, currentIndex, totalProjects }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-800 flex flex-col lg:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300"
        >
          <FiX className="text-xl" />
        </button>
        
        <div className="w-full lg:w-1/2 h-64 lg:h-full bg-gray-800 relative">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full lg:w-1/2 p-6 lg:p-8 overflow-y-auto">
          <div className="flex items-center mb-6">
            <div className="mr-4 p-3 rounded-lg bg-indigo-600/20 text-indigo-400">
              <FiLayers className="text-xl" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>
          
          <p className="text-gray-300 mb-6">
            {project.description}
          </p>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-gray-800 text-indigo-400 rounded-lg text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white"
            >
              <FiGithub className="mr-2" /> Source Code
            </a>
            <a 
              href={project.live} 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white border border-gray-700"
            >
              <HiOutlineExternalLink className="mr-2" /> Live Demo
            </a>
          </div>
        </div>
        
        {totalProjects > 1 && (
          <>
            <button 
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hidden lg:block"
            >
              <FiChevronLeft className="text-2xl" />
            </button>
            <button 
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hidden lg:block"
            >
              <FiChevronRight className="text-2xl" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

const projects = [
   {
    id: 1,
    title: 'Civil Engineering Calculator Suite',
    description: 'A comprehensive collection of calculators designed for civil engineers, construction professionals, and students. These tools simplify complex calculations related to structural design, material estimation, surveying, and more, ensuring accuracy and efficiency in engineering projects.',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Redux'],
    github: 'https://github.com/saiduzzamansaad',
    live: 'https://civil-xi.vercel.app/',
    image: project1,
    features: [
      'Structural Design Calculators',
      'Material Estimation Tools',
      'Unit Converters',
      'Geotechnical Engineering',
      'User-Friendly Interface'
    ]
  },
  {
    id: 2,
    title: 'Task Manager',
    description: 'A task management application with drag-and-drop functionality, team collaboration features, and real-time updates using Firebase.',
    tags: ['React', 'Firebase', 'Tailwind CSS'],
    github: 'https://github.com',
    live: 'https://example.com',
    // image: TaskManagerImage,
    features: [
      'Drag-and-drop interface',
      'Real-time collaboration',
      'Task assignments',
      'Progress tracking'
    ]
  },
  {
    id: 3,
    title: 'Weather App',
    description: 'A weather application that displays current and forecasted weather conditions for any location worldwide with interactive charts.',
    tags: ['React', 'OpenWeather API', 'Chart.js'],
    github: 'https://github.com',
    live: 'https://example.com',
    // image: WeatherAppImage,
    features: [
      'Current weather conditions',
      '7-day forecast',
      'Geolocation detection',
      'City search'
    ]
  },
  {
    id: 4,
    title: 'AI Content Generator',
    description: 'An AI-powered content generation tool that helps create marketing copy, blog posts, and social media content using GPT-3.',
    tags: ['Next.js', 'OpenAI API', 'Node.js'],
    github: 'https://github.com',
    live: 'https://example.com',
    // image: AIContentImage,
    features: [
      'AI content generation',
      'Multiple templates',
      'Content history',
      'Export options'
    ]
  }
];

const ProjectsSection = () => {
  const [viewModal, setViewModal] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const sectionRef = useRef(null);

  const openModal = (index) => {
    setCurrentProjectIndex(index);
    setViewModal(true);
  };

  const closeModal = () => {
    setViewModal(false);
  };

  const goToNextProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevProject = () => {
    setCurrentProjectIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="w-full py-20 bg-gray-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            My Projects
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            A collection of my recent work showcasing my skills and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
              onClick={() => openModal(index)}
            >
              <div className="relative h-full bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-indigo-500 transition-all">
                <div className="h-64 lg:h-80 relative cursor-pointer bg-gray-800">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 rounded-lg bg-indigo-600/20 text-indigo-400">
                      <FiLayers className="text-xl" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 mb-6">
                    {project.description.substring(0, 120)}...
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-gray-800 text-indigo-400 rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank');
                      }}
                    >
                      <FiGithub className="mr-2" /> Code
                    </button>
                    <button
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.live, '_blank');
                      }}
                    >
                      <HiOutlineExternalLink className="mr-2" /> Demo
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium border border-gray-700"
          >
            View More Projects
          </button>
        </div>
      </div>

      <AnimatePresence>
        {viewModal && (
          <ProjectModal 
            project={projects[currentProjectIndex]} 
            onClose={closeModal}
            onNext={goToNextProject}
            onPrev={goToPrevProject}
            currentIndex={currentProjectIndex}
            totalProjects={projects.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
