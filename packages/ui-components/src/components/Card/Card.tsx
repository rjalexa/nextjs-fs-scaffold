import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import React from 'react';

// Extended card props
export interface CardProps extends Omit<MuiCardProps, 'title'> {
  /**
   * Card title
   */
  title?: React.ReactNode;
  
  /**
   * Card subtitle
   */
  subtitle?: React.ReactNode;
  
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
}

/**
 * Enhanced Card component with common patterns
 */
export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt = '',
  imageHeight = 140,
  actions,
  loading = false,
  headerAction,
  ...props
}) => {
  return (
    <MuiCard {...props}>
      {/* Card Header */}
      {(title || subtitle) && (
        <CardHeader
          title={
            loading ? (
              <Skeleton animation="wave" height={10} width="80%" />
            ) : (
              title
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              subtitle
            )
          }
          action={headerAction}
        />
      )}

      {/* Card Media */}
      {image && (
        loading ? (
          <Skeleton 
            animation="wave" 
            variant="rectangular" 
            height={imageHeight} 
            width="100%" 
          />
        ) : (
          <CardMedia
            component="img"
            height={imageHeight}
            image={image}
            alt={imageAlt}
            sx={{ objectFit: 'contain' }}
          />
        )
      )}

      {/* Card Content */}
      <CardContent>
        {loading ? (
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        ) : (
          children
        )}
      </CardContent>

      {/* Card Actions */}
      {actions && <CardActions>{actions}</CardActions>}
    </MuiCard>
  );
};

/**
 * Card Title component
 */
export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="h6" component="h2" gutterBottom>
    {children}
  </Typography>
);

/**
 * Card Text component
 */
export const CardText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="body2" color="text.secondary" component="div">
    {children}
  </Typography>
);
