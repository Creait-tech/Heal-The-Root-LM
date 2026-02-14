'use client';

import { useTheme } from '@/lib/theme-context';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center
                 bg-white/80 dark:bg-dark-card/80 border border-sage/10 dark:border-dark-border
                 shadow-soft dark:shadow-dark-soft backdrop-blur-sm
                 text-charcoal dark:text-dark-text text-base cursor-pointer
                 transition-colors duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'dark' ? '☀' : '☾'}
    </motion.button>
  );
}
