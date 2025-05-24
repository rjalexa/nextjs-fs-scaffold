'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import ThemeProvider with SSR disabled
const DynamicThemeProvider = dynamic(
  () => import('ui-components').then((mod) => mod.ThemeProvider),
  { ssr: false }
);

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  return (
    <DynamicThemeProvider defaultMode="system">
      {children}
    </DynamicThemeProvider>
  );
}
