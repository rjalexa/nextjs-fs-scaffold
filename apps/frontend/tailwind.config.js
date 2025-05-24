/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui-components/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('daisyui'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/forms'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#3b82f6',
          'primary-focus': '#2563eb',
          'primary-content': '#ffffff',
          'secondary': '#8b5cf6',
          'secondary-focus': '#7c3aed',
          'secondary-content': '#ffffff',
          'accent': '#06b6d4',
          'accent-focus': '#0891b2',
          'accent-content': '#ffffff',
          'neutral': '#374151',
          'neutral-focus': '#1f2937',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#f3f4f6',
          'base-content': '#1f2937',
          'info': '#3abff8',
          'success': '#36d399',
          'warning': '#fbbd23',
          'error': '#f87272',
        },
        dark: {
          'primary': '#60a5fa',
          'primary-focus': '#3b82f6',
          'primary-content': '#1e3a8a',
          'secondary': '#a78bfa',
          'secondary-focus': '#8b5cf6',
          'secondary-content': '#312e81',
          'accent': '#22d3ee',
          'accent-focus': '#06b6d4',
          'accent-content': '#164e63',
          'neutral': '#1f2937',
          'neutral-focus': '#111827',
          'neutral-content': '#d1d5db',
          'base-100': '#1f2937',
          'base-200': '#374151',
          'base-300': '#4b5563',
          'base-content': '#d1d5db',
          'info': '#3abff8',
          'success': '#36d399',
          'warning': '#fbbd23',
          'error': '#f87272',
        },
      },
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
}
