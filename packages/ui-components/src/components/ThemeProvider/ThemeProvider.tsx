'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeMode } from 'shared';

import { createAppTheme, getEffectiveThemeMode } from '../../theme';

// Theme context type
interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface AppThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

/**
 * Custom theme provider component
 * Manages theme mode and provides theme context
 */
export const ThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
  defaultMode = 'system',
}) => {
  // State for theme mode
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultMode);
  
  // Get effective theme mode (light or dark)
  const effectiveMode = getEffectiveThemeMode(themeMode);
  
  // Create theme based on mode
  const theme = useMemo(() => createAppTheme(effectiveMode), [effectiveMode]);
  
  // Context value
  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeMode,
    }),
    [themeMode]
  );

  // Effect to save theme mode to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', themeMode);
    }
  }, [themeMode]);

  // Effect to load theme mode from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode') as ThemeMode | null;
      if (savedMode) {
        setThemeMode(savedMode);
      }
    }
  }, []);

  // Effect to listen for system theme changes
  useEffect(() => {
    if (themeMode !== 'system' || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Force re-render when system theme changes
      setThemeMode((prev: ThemeMode) => {
        if (prev === 'system') {
          // This is a trick to force re-render without changing the actual value
          setThemeMode('system-temp' as ThemeMode);
          setTimeout(() => setThemeMode('system'), 0);
        }
        return prev;
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
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
