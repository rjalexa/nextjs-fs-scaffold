import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { AppThemeProvider } from './theme';

// Load Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Metadata for the application
export const metadata: Metadata = {
  title: {
    template: '%s | Next.js Full-Stack App',
    default: 'Next.js Full-Stack App',
  },
  description: 'A production-ready Next.js full-stack application scaffold',
  icons: {
    icon: '/favicon.ico',
  },
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppThemeProvider>
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}
