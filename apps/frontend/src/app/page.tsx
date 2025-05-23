'use client';

import { Container, Typography, Box, Grid, Paper, Divider, List, ListItem, ListItemText, Chip } from '@mui/material';
import React, { useState } from 'react';
import { Button, Card, CardText, Alert, useTheme } from 'ui-components';

// Interface for Random User API response
interface RandomUserResponse {
  results: Array<{
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    phone: string;
    picture: {
      large: string;
    };
    location: {
      city: string;
      country: string;
    };
  }>;
}

/**
 * Home page component
 */
export default function HomePage() {
  // Theme state
  const { themeMode, setThemeMode } = useTheme();
  
  // Alert state
  const [alertOpen, setAlertOpen] = useState(true);
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // API response state
  const [apiResponse, setApiResponse] = useState<RandomUserResponse | null>(null);
  const [apiUrl, setApiUrl] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Handle fetch button click
  const handleFetch = async () => {
    setLoading(true);
    
    // Reset previous API response data
    setApiResponse(null);
    setApiError(null);
    
    // Prepare API URL
    const url = 'https://randomuser.me/api/';
    setApiUrl(url);
    
    try {
      // Log the request details
      console.info('API URL:', url);
      
      // Make the API call
      console.info('Making API call...');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      // Store the status code
      const status = response.status;
      setApiStatus(status);
      console.info('Response status:', status);
      
      // Parse the response
      console.info('Parsing response...');
      const data = await response.json();
      console.info('Response data received:', data);
      
      // Store the API response
      console.info('Updating state with response data...');
      setApiResponse(data);
      
      // Show success alert
      setAlertOpen(true);
      console.info('API call completed successfully');
    } catch (error) {
      console.error('API request failed:', error);
      setApiError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
      console.info('Loading state set to false');
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Next.js Full-Stack Application
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          A production-ready scaffold with Next.js, Material UI, and TypeScript
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={toggleTheme}
            sx={{ mr: 2 }}
          >
            Toggle {themeMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            href="https://github.com"
            component="a"
            onClick={() => window.open("https://github.com", "_blank", "noopener")}
          >
            View Source
          </Button>
        </Box>
      </Box>
      
      {/* Alert */}
      {alertOpen && (
        <Alert
          severity="success"
          title="Welcome to the Next.js Full-Stack Application!"
          dismissible
          onDismiss={() => setAlertOpen(false)}
          sx={{ mb: 4 }}
        >
          This is a production-ready scaffold with Next.js, Material UI, and TypeScript.
        </Alert>
      )}
      
      {/* Feature Cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <Card
            title="Next.js 15 with App Router"
            subtitle="Modern React Framework"
            image="/images/nextjs.png"
            imageAlt="Next.js Logo"
            imageHeight={150}
          >
            <CardText>
              Utilizing the latest Next.js features including App Router, Server Components, and React Server Actions.
            </CardText>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            title="Material UI v6"
            subtitle="Beautiful UI Components"
            image="/images/material-design.png"
            imageAlt="Material UI Logo"
            imageHeight={150}
          >
            <CardText>
              Leveraging Material UI&apos;s comprehensive component library with custom theme configuration.
            </CardText>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            title="TypeScript"
            subtitle="Type-Safe Development"
            image="/images/typescript.png"
            imageAlt="TypeScript Logo"
            imageHeight={150}
          >
            <CardText>
              Full TypeScript support for enhanced developer experience and code quality.
            </CardText>
          </Card>
        </Grid>
      </Grid>
      
      {/* Fetch Button */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Random User API
        </Typography>
        <Typography variant="body1" paragraph>
          Click the button below to fetch random user data from the public API.
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleFetch}
            loading={loading}
          >
            FETCH
          </Button>
        </Box>
      </Paper>
      
      {/* API Response Display */}
      {(apiResponse || apiError) && (
        <Paper sx={{ p: 4, mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            API Response Details
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText 
                primary="API Endpoint URL" 
                secondary={apiUrl} 
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            
            <Divider component="li" />
            
            
            <ListItem>
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Response Status
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Chip 
                    label={apiStatus ? `${apiStatus} ${apiStatus === 200 ? '(OK)' : ''}` : 'Unknown'} 
                    color={apiStatus === 200 ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>
              </Box>
            </ListItem>
          </List>
          
          {apiError && (
            <Alert 
              severity="error" 
              title="API Request Failed" 
              sx={{ mt: 2 }}
            >
              {apiError}
            </Alert>
          )}
          
          {apiResponse && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" gutterBottom>
                Random User Data
              </Typography>
              
              {apiResponse.results && apiResponse.results.length > 0 && (
                <Card
                  title={`${apiResponse.results[0].name.title} ${apiResponse.results[0].name.first} ${apiResponse.results[0].name.last}`}
                  subtitle={`Email: ${apiResponse.results[0].email}`}
                  image={apiResponse.results[0].picture.large}
                  imageAlt="Random User"
                  imageHeight={150}
                >
                  <CardText>
                    <Box component="div" sx={{ mb: 1 }}>
                      <Typography variant="body2" component="span">
                        <strong>Location:</strong> {apiResponse.results[0].location.city}, {apiResponse.results[0].location.country}
                      </Typography>
                    </Box>
                    <Box component="div">
                      <Typography variant="body2" component="span">
                        <strong>Phone:</strong> {apiResponse.results[0].phone}
                      </Typography>
                    </Box>
                  </CardText>
                </Card>
              )}
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Raw Response:
                </Typography>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'grey.100', 
                    maxHeight: '200px', 
                    overflow: 'auto',
                    '& pre': { margin: 0 }
                  }}
                >
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </Paper>
              </Box>
            </Box>
          )}
        </Paper>
      )}
      
      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Next.js Full-Stack Application. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
