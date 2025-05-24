'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeMode } from 'shared';

// Theme context type
interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

/**
 * Modern theme provider for Tailwind CSS + DaisyUI
 * Manages theme mode and provides theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = 'system',
}) => {
  // State for theme mode
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);
  const [mounted, setMounted] = useState(false);
  
  // Get effective theme mode (light or dark)
  const getEffectiveThemeMode = (mode: ThemeMode): 'light' | 'dark' => {
    if (mode === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'light'; // Default to light if window is not available (SSR)
    }
    return mode;
  };

  const effectiveMode = getEffectiveThemeMode(themeMode);
  const isDark = effectiveMode === 'dark';
  
  // Context value
  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      isDark,
    }),
    [themeMode, isDark]
  );

  // Effect to apply theme to document
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    root.setAttribute('data-theme', effectiveMode);
    
    // Also set class for additional styling if needed
    if (effectiveMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [effectiveMode, mounted]);

  // Effect to save theme mode to localStorage
  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode, mounted]);

  // Effect to load theme mode from localStorage and handle mounting
  useEffect(() => {
    setMounted(true);
    
    const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
    if (savedMode && ['light', 'dark', 'system'].includes(savedMode)) {
      setThemeMode(savedMode);
    }
  }, []);

  // Effect to listen for system theme changes
  useEffect(() => {
    if (!mounted || themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Force re-render when system theme changes
      const newEffectiveMode = getEffectiveThemeMode('system');
      document.documentElement.setAttribute('data-theme', newEffectiveMode);
      
      if (newEffectiveMode === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode, mounted]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {!mounted ? <div style={{ visibility: 'hidden' }}>{children}</div> : children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 * @returns Theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
