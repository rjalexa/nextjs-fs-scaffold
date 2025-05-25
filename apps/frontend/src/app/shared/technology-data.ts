import { Code, Palette, Sparkles, Shield, LucideIcon } from 'lucide-react';

export interface Technology {
  name: string;
  description: string;
  image: string;
  iconComponent: LucideIcon;
  variant: 'primary' | 'secondary' | 'accent' | 'warning';
}

export const technologies: Technology[] = [
  {
    name: 'Next.js',
    description: 'The React Framework for Production. Full-stack React framework with server-side rendering, static generation, and more.',
    image: '/images/nextjs.png',
    iconComponent: Code,
    variant: 'primary'
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.',
    image: '/images/tailwind.png',
    iconComponent: Palette,
    variant: 'secondary'
  },
  {
    name: 'DaisyUI',
    description: 'Beautiful, semantic component classes for Tailwind CSS. Build faster with pre-designed components.',
    image: '/images/daisyui.png',
    iconComponent: Sparkles,
    variant: 'accent'
  },
  {
    name: 'TypeScript',
    description: 'Full TypeScript support for enhanced developer experience, better code quality, and fewer runtime errors.',
    image: '/images/typescript.png',
    iconComponent: Shield,
    variant: 'warning'
  },
];
