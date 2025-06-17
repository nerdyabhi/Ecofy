import React, { useEffect } from 'react';
import useStore from '../stores/useStore';

const ThemeProvider = ({ children }) => {
  const { isDarkMode, setDarkMode } = useStore();

  useEffect(() => {
    // Check system preference on first load
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // If no preference is stored, use system preference
    if (localStorage.getItem('ecofy-storage') === null) {
      setDarkMode(systemPrefersDark);
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem('ecofy-storage')?.includes('isDarkMode');
      if (!hasManualPreference) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setDarkMode]);

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
