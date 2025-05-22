import CloseIcon from '@mui/icons-material/Close';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import React from 'react';

// Extended alert props
export interface AlertProps extends Omit<MuiAlertProps, 'title'> {
  /**
   * Alert title
   */
  title?: React.ReactNode;
  
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
}

/**
 * Enhanced Alert component with title and dismiss functionality
 */
export const Alert: React.FC<AlertProps> = ({
  children,
  title,
  dismissible = false,
  onDismiss,
  open = true,
  action,
  ...props
}) => {
  // Handle close button click
  const handleClose = () => {
    if (onDismiss) {
      onDismiss();
    }
  };

  // Combine custom action with close button if dismissible
  const alertAction = (
    <>
      {action}
      {dismissible && (
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      )}
    </>
  );

  return (
    <Collapse in={open}>
      <MuiAlert {...props} action={alertAction}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </MuiAlert>
    </Collapse>
  );
};
