import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, name: 'Home', href: '#home' },
    { id: 2, name: 'About', href: '#about' },
    { id: 3, name: 'Skills', href: '#skills' },
    { id: 4, name: 'Projects', href: '#projects' },
    { id: 5, name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full h-20 flex justify-between items-center px-4 bg-[#0a192f] text-gray-300 z-50"
    >
      <div>
        <a href="#home" className="text-2xl font-bold text-pink-600">DevPort</a>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {links.map(({ id, name, href }) => (
          <li key={id} className="px-4 cursor-pointer capitalize font-medium text-gray-300 hover:text-pink-600 duration-200">
            <a href={href}>{name}</a>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation */}
      <div onClick={() => setNav(!nav)} className="cursor-pointer z-10 text-gray-300 md:hidden">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <motion.ul 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-[#0a192f] to-[#112240]"
        >
          {links.map(({ id, name, href }) => (
            <li key={id} className="px-4 cursor-pointer capitalize py-6 text-4xl">
              <a onClick={() => setNav(false)} href={href}>{name}</a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default Navbar;