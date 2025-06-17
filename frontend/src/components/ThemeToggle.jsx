import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../stores/useStore';
import { Button } from './ui/button';

const ThemeToggle = ({ className = "", size = "default" }) => {
  const { isDarkMode, toggleDarkMode } = useStore();

  return (
    <Button
      variant="ghost"
      size={size}
      onClick={toggleDarkMode}
      className={`relative overflow-hidden ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 0 : 1,
          opacity: isDarkMode ? 0 : 1,
          rotate: isDarkMode ? 90 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-4 w-4" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          scale: isDarkMode ? 1 : 0,
          opacity: isDarkMode ? 1 : 0,
          rotate: isDarkMode ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-4 w-4" />
      </motion.div>
      
      {/* Invisible placeholder to maintain button size */}
      <div className="opacity-0">
        <Sun className="h-4 w-4" />
      </div>
    </Button>
  );
};

export default ThemeToggle;
