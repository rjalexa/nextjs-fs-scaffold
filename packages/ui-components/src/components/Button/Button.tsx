import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

// Extended button props
export interface ButtonProps extends Omit<MuiButtonProps, 'startIcon' | 'endIcon'> {
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
   * Size of the loading spinner
   */
  loadingSize?: number;
}

/**
 * Enhanced Button component with loading state
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  loadingSize = 20,
  ...props
}) => {
  // Determine if button should be disabled
  const isDisabled = loading || disabled;
  
  // Render loading spinner or start icon
  const renderStartIcon = () => {
    if (loading) {
      return <CircularProgress size={loadingSize} color="inherit" />;
    }
    return startIcon;
  };

  return (
    <MuiButton
      {...props}
      disabled={isDisabled}
      startIcon={renderStartIcon()}
      endIcon={!loading ? endIcon : undefined}
    >
      {children}
    </MuiButton>
  );
};
