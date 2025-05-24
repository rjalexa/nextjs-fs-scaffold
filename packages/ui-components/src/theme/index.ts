// Theme utilities for Tailwind CSS + DaisyUI

/**
 * Utility function to combine class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Theme mode type
 */
export type { ThemeMode } from 'shared';

/**
 * Common animation variants for Framer Motion
 */
export const animationVariants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
};

/**
 * Common transition settings
 */
export const transitions = {
  default: { duration: 0.2 },
  smooth: { duration: 0.3, ease: 'easeInOut' },
  spring: { type: 'spring', stiffness: 400, damping: 17 },
};
