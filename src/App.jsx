import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const Service = lazy(() => import('./components/Service'));

function App() {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Midnight Mist Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
          `,
          willChange: 'transform', // Optimizes animations
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-300">Loading...</div>}>
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Service />
            <Contact />
          </div>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
