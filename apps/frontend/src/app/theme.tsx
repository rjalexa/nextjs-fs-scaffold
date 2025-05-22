'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import React from 'react';
import { ThemeProvider } from 'ui-components';

interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Application theme provider that combines MUI's cache provider with our custom theme provider
 */
export function AppThemeProvider({ children }: ThemeProviderProps) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider defaultMode="system">
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
