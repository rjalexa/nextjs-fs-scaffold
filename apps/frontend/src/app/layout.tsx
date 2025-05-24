import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '../components/ThemeProviderWrapper';
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
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('themeMode');
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                const initialTheme = savedTheme === 'system' ? systemTheme : (savedTheme || systemTheme);
                document.documentElement.setAttribute('data-theme', initialTheme);
                if (initialTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
