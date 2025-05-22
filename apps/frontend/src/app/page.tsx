'use client';

import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';
import { Button, Card, CardText, TextField, Alert, useTheme } from 'ui-components';

/**
 * Home page component
 */
export default function HomePage() {
  // Theme state
  const { themeMode, setThemeMode } = useTheme();
  
  // Alert state
  const [alertOpen, setAlertOpen] = useState(true);
  
  // Form state
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.info('Form submitted:', formValues);
    setLoading(false);
    
    // Reset form
    setFormValues({
      name: '',
      email: '',
      message: '',
    });
    
    // Show success alert
    setAlertOpen(true);
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
      
      {/* Contact Form */}
      <Paper sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Form
        </Typography>
        <Typography variant="body1" paragraph>
          This is a sample form demonstrating form handling with Material UI and React.
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                disabled={loading}
                loading={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                disabled={loading}
                loading={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formValues.message}
                onChange={handleInputChange}
                disabled={loading}
                loading={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                loading={loading}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Footer */}
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Next.js Full-Stack Application. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
