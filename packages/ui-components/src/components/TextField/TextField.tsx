import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import React, { forwardRef } from 'react';

// Extended text field props
export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  /**
   * Input props passed to the underlying input element
   */
  InputProps?: MuiTextFieldProps['InputProps'];
  
  /**
   * If true, the component is disabled
   */
  disabled?: boolean;
  
  /**
   * If true, the label is displayed in an error state
   */
  error?: boolean;
  
  /**
   * Helper text to display below the input
   */
  helperText?: React.ReactNode;
  /**
   * If true, the text field will show a loading spinner
   */
  loading?: boolean;
  
  /**
   * Size of the loading spinner
   */
  loadingSize?: number;
  
  /**
   * Additional helper text to display below the field
   */
  additionalHelperText?: React.ReactNode;
}

/**
 * Enhanced TextField component with loading state
 */
export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      loading = false,
      loadingSize = 20,
      InputProps,
      disabled,
      error,
      helperText,
      additionalHelperText,
      ...props
    },
    ref
  ) => {
    // Determine if field should be disabled
    const isDisabled = loading || disabled;
    
    // Combine input props with loading indicator
    const combinedInputProps = {
      ...InputProps,
      endAdornment: (
        <>
          {loading && (
            <InputAdornment position="end">
              <CircularProgress size={loadingSize} color="inherit" />
            </InputAdornment>
          )}
          {InputProps?.endAdornment}
        </>
      ),
    };

    return (
      <FormControl fullWidth error={error} disabled={isDisabled}>
        <MuiTextField
          ref={ref}
          {...props}
          disabled={isDisabled}
          error={error}
          helperText={helperText}
          InputProps={combinedInputProps}
        />
        {additionalHelperText && (
          <FormHelperText error={error}>{additionalHelperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

// Display name for debugging
TextField.displayName = 'TextField';
