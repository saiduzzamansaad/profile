import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import  Service from './components/Service'


function App() {
  return (
    <div className="bg-[#0a192f] text-gray-300 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Service/>
        <Contact />
        
      </div>
      <Footer />
    </div>
  );
}

export default App;