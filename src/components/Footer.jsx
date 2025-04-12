import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#0a192f] text-gray-300 py-8 border-t border-gray-800"
    >
      <div className="max-w-[1000px] mx-auto px-8 flex flex-col items-center">
        <div className="flex space-x-6 mb-6">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-colors">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-colors">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="mailto:email@example.com" className="hover:text-pink-600 transition-colors">
            <HiOutlineMail size={24} />
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} John Doe. All rights reserved.
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Built with React, Tailwind CSS, and Framer Motion
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;