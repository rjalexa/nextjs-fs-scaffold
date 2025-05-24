'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React, { forwardRef } from 'react';

// Button variant types
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'accent' 
  | 'ghost' 
  | 'outline'
  | 'outlined'
  | 'link'
  | 'success'
  | 'warning'
  | 'error';

// Button size types
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Extended button props
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * Button variant style
   */
  variant?: ButtonVariant;
  
  /**
   * Button size
   */
  size?: ButtonSize;
  
  /**
   * If true, the button will show a loading spinner
   */
  loading?: boolean;
  
  /**
   * Icon to display at the start of the button
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to display at the end of the button
   */
  endIcon?: React.ReactNode;
  
  /**
   * If true, the button will take full width
   */
  fullWidth?: boolean;
  
  /**
   * If true, the button will have modern hover animations
   */
  animated?: boolean;
  
  /**
   * Custom className for additional styling
   */
  className?: string;
}

// Variant class mappings
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
  outlined: 'btn-outline',
  link: 'btn-link',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
};

// Size class mappings
const sizeClasses: Record<ButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '', // Default size
  lg: 'btn-lg',
  xl: 'btn-xl',
};

/**
 * Modern Button component with Tailwind CSS + DaisyUI
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      fullWidth = false,
      animated = true,
      className = '',
      onClick,
      ...props
    },
    ref
  ) => {
    // Determine if button should be disabled
    const isDisabled = loading || disabled;
    
    // Build class names
    const baseClasses = 'btn focus-modern';
    const variantClass = variantClasses[variant];
    const sizeClass = sizeClasses[size];
    const widthClass = fullWidth ? 'btn-block' : '';
    const animatedClass = animated ? 'btn-modern' : '';
    const disabledClass = isDisabled ? 'btn-disabled' : '';
    
    const buttonClasses = [
      baseClasses,
      variantClass,
      sizeClass,
      widthClass,
      animatedClass,
      disabledClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Handle click with animation
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled || !onClick) return;
      onClick(e);
    };

    // Render loading spinner or start icon
    const renderStartIcon = () => {
      if (loading) {
        return <Loader2 className="w-4 h-4 animate-spin" />;
      }
      return startIcon;
    };

    const buttonContent = (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {renderStartIcon()}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
        {!loading && endIcon}
      </button>
    );

    // Wrap with motion if animated
    if (animated && !isDisabled) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {buttonContent}
        </motion.div>
      );
    }

    return buttonContent;
  }
);

// Display name for debugging
Button.displayName = 'Button';
