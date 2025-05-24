import type { Metadata } from 'next';
import { ThemeProvider } from 'ui-components';
import './globals.css';

export const metadata: Metadata = {
  title: 'Next.js Full-Stack Application',
  description: 'A modern, production-ready scaffold with Next.js, Tailwind CSS, DaisyUI, and TypeScript',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider defaultMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
