'use client';

import { motion } from 'framer-motion';
import * as React from 'react';

// Extended card props
export interface CardProps {
  /**
   * Card title
   */
  title?: React.ReactNode;
  
  /**
   * Card subtitle
   */
  subtitle?: React.ReactNode;
  
  /**
   * Card content
   */
  children?: React.ReactNode;
  
  /**
   * Card media image source
   */
  image?: string;
  
  /**
   * Card media image alt text
   */
  imageAlt?: string;
  
  /**
   * Card media height
   */
  imageHeight?: number | string;
  
  /**
   * Card actions (buttons, etc.)
   */
  actions?: React.ReactNode;
  
  /**
   * If true, the card will show loading skeletons
   */
  loading?: boolean;
  
  /**
   * Card header action (icon button, etc.)
   */
  headerAction?: React.ReactNode;
  
  /**
   * If true, the card will have glass morphism effect
   */
  glass?: boolean;
  
  /**
   * If true, the card will have hover animations
   */
  animated?: boolean;
  
  /**
   * Custom className for additional styling
   */
  className?: string;
  
  /**
   * Additional HTML attributes
   */
  style?: React.CSSProperties;
  id?: string;
  role?: string;
}

/**
 * Modern Card component with Tailwind CSS + DaisyUI
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt = '',
  actions,
  loading = false,
  headerAction,
  glass = false,
  animated = true,
  className = '',
  style,
  id,
  role,
}) => {
  // Build class names
  const baseClasses = 'card bg-white shadow-xl p-4 h-[450px] flex flex-col relative'; // Fixed height and flex column for equal heights
  const glassClasses = glass ? 'backdrop-blur-lg bg-white/10 border border-white/20' : '';
  const animatedClasses = animated ? 'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1' : '';
  
  const cardClasses = [
    baseClasses,
    glassClasses,
    animatedClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const cardContent = (
    <div className={cardClasses} style={style} id={id} role={role}>
      {/* Card Image */}
      {image && (
          <figure className="relative overflow-hidden flex items-center justify-center flex-shrink-0">
          {loading ? (
            <div 
              className="animate-pulse bg-gray-300 w-full h-32"
            />
          ) : (
              <img
                src={image}
                alt={imageAlt}
                className="object-contain transition-transform duration-300 hover:scale-105 h-32 w-auto"
              />
          )}
        </figure>
      )}

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-grow overflow-hidden">
        {/* Card Header */}
        {(title || subtitle || headerAction) && (
          <div className="flex justify-between items-start mb-4 flex-shrink-0">
            <div className="flex-1">
              {title && (
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {loading ? (
                    <div className="animate-pulse bg-gray-300 h-6 w-3/4 rounded"></div>
                  ) : (
                    title
                  )}
                </h2>
              )}
              {subtitle && (
                <p className="text-gray-600 text-sm">
                  {loading ? (
                    <div className="animate-pulse bg-gray-300 h-4 w-1/2 rounded"></div>
                  ) : (
                    subtitle
                  )}
                </p>
              )}
            </div>
            {headerAction && !loading && (
              <div className="flex-shrink-0 ml-4">
                {headerAction}
              </div>
            )}
          </div>
        )}

        {/* Card Content - This will expand to fill available space */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="flex-grow">
            {loading ? (
              <div className="space-y-2">
                <div className="animate-pulse bg-gray-300 h-4 w-full rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-5/6 rounded"></div>
                <div className="animate-pulse bg-gray-300 h-4 w-4/6 rounded"></div>
              </div>
            ) : (
              children
            )}
          </div>

          {/* Card Actions - Always at the bottom */}
          {actions && (
            <div className="flex justify-end mt-6 gap-2 flex-shrink-0 relative z-10">
              {loading ? (
                <div className="flex gap-2">
                  <div className="animate-pulse bg-gray-300 h-10 w-20 rounded"></div>
                  <div className="animate-pulse bg-gray-300 h-10 w-20 rounded"></div>
                </div>
              ) : (
                actions
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Wrap with motion if animated
  if (animated && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        className="relative z-0"
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

/**
 * Card Title component
 */
export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

/**
 * Card Text component
 */
export const CardText: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={`text-gray-700 ${className}`}>
    {children}
  </div>
);
