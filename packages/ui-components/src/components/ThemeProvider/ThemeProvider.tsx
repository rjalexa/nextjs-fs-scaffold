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
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Initialize themeMode from the data-theme attribute set by the inline script on the HTML element.
    // This ensures consistency between server-rendered and client-hydrated content.
    if (typeof window !== 'undefined') {
      const rootTheme = document.documentElement.getAttribute('data-theme');
      if (rootTheme && ['light', 'dark', 'system'].includes(rootTheme)) {
        return rootTheme as ThemeMode;
      }
    }
    // Fallback to defaultMode if data-theme is not found or invalid (should not happen with inline script).
    return defaultMode;
  });

  // Ref to track if it's the initial render
  const initialRender = React.useRef(true);

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

  // Effect to save theme mode to localStorage
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return; // Do not save on initial render, as it's read from localStorage or system
    }
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // Effect to listen for system theme changes and update themeMode state
  useEffect(() => {
    if (themeMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      // When system theme changes, update the internal themeMode state to reflect it.
      // This will trigger a re-render and the `data-theme` attribute will be updated by DaisyUI.
      setThemeMode('system');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
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
