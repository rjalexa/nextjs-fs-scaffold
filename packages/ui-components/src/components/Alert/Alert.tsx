'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import React from 'react';

// Alert severity types
export type AlertSeverity = 'success' | 'error' | 'warning' | 'info';

// Extended alert props
export interface AlertProps {
  /**
   * Alert severity/type
   */
  severity?: AlertSeverity;
  
  /**
   * Alert title
   */
  title?: React.ReactNode;
  
  /**
   * Alert content
   */
  children?: React.ReactNode;
  
  /**
   * If true, the alert will be dismissible
   */
  dismissible?: boolean;
  
  /**
   * Callback when the alert is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * If true, the alert will be visible
   */
  open?: boolean;
  
  /**
   * Custom icon to display
   */
  icon?: React.ReactNode;
  
  /**
   * If true, hide the default icon
   */
  hideIcon?: boolean;
  
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

// Severity class mappings
const severityClasses: Record<AlertSeverity, string> = {
  success: 'alert-success',
  error: 'alert-error',
  warning: 'alert-warning',
  info: 'alert-info',
};

// Default icons for each severity
const severityIcons: Record<AlertSeverity, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

/**
 * Modern Alert component with Tailwind CSS + DaisyUI
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  severity = 'info',
  title,
  dismissible = false,
  onDismiss,
  open = true,
  icon,
  hideIcon = false,
  className = '',
  style,
  id,
  role,
}) => {
  // Handle close button click
  const handleClose = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  // Build class names
  const baseClasses = 'alert';
  const severityClass = severityClasses[severity];
  
  const alertClasses = [
    baseClasses,
    severityClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Get the icon to display
  const displayIcon = icon || (!hideIcon ? severityIcons[severity] : null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={alertClasses}
          style={style}
          id={id}
          role={role}
        >
          {/* Icon */}
          {displayIcon && (
            <div className="flex-shrink-0">
              {displayIcon}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1">
            {title && (
              <div className="font-semibold mb-1">
                {title}
              </div>
            )}
            {children && (
              <div className={title ? 'text-sm opacity-90' : ''}>
                {children}
              </div>
            )}
          </div>
          
          {/* Dismiss button */}
          {dismissible && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="btn btn-sm btn-ghost btn-circle flex-shrink-0 ml-2"
              aria-label="Close alert"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
