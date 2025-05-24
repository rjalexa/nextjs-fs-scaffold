'use client';

import { ThemeProvider } from 'ui-components';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  return (
    <ThemeProvider defaultMode="system">
      {children}
    </ThemeProvider>
  );
}
