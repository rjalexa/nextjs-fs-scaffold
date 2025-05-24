'use client';

import { motion } from 'framer-motion';
import { Github, Moon, Sun, Monitor, Sparkles, Zap, Shield, Rocket } from 'lucide-react';
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
 * Modern Home page component with Tailwind CSS + DaisyUI
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
      console.info('API URL:', url);
      console.info('Making API call...');
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const status = response.status;
      setApiStatus(status);
      console.info('Response status:', status);
      
      const data = await response.json();
      console.info('Response data received:', data);
      
      setApiResponse(data);
      setAlertOpen(true);
      console.info('API call completed successfully');
    } catch (error) {
      console.error('API request failed:', error);
      setApiError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const modes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setThemeMode(modes[nextIndex]);
  };

  // Get theme icon
  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      case 'system':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Next.js</span>
              <br />
              <span className="text-base-content">Full-Stack Application</span>
            </h1>
            <p className="text-xl md:text-2xl text-base-content/80 mb-8 leading-relaxed">
              A modern, production-ready scaffold with{' '}
              <span className="font-semibold text-primary">Tailwind CSS</span>,{' '}
              <span className="font-semibold text-secondary">DaisyUI</span>, and{' '}
              <span className="font-semibold text-accent">TypeScript</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="primary" 
                size="lg"
                startIcon={<Sparkles className="w-5 h-5" />}
                className="btn-modern"
              >
                Get Started
              </Button>
              <Button 
                variant="outlined" 
                size="lg"
                startIcon={<Github className="w-5 h-5" />}
                onClick={() => window.open("https://github.com", "_blank", "noopener")}
              >
                View Source
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                startIcon={getThemeIcon()}
                onClick={toggleTheme}
                className="capitalize"
              >
                {themeMode} Mode
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Alert */}
        {alertOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Alert
              severity="success"
              title="Welcome to the Modern UI Experience!"
              dismissible
              onDismiss={() => setAlertOpen(false)}
            >
              This application showcases the power of Tailwind CSS + DaisyUI with beautiful animations and modern design patterns.
            </Alert>
          </motion.div>
        )}
        
        {/* Feature Cards */}
        <section className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
          >
            Modern Features
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              title="Tailwind CSS + DaisyUI"
              subtitle="Modern Styling Framework"
              image="/images/nextjs.png"
              imageAlt="Next.js Logo"
              imageHeight={200}
              actions={
                <Button variant="primary" size="sm" startIcon={<Zap className="w-4 h-4" />}>
                  Learn More
                </Button>
              }
            >
              <CardText>
                Utilizing Tailwind CSS utilities with DaisyUI components for rapid development and consistent design.
              </CardText>
            </Card>

            <Card
              title="Framer Motion"
              subtitle="Smooth Animations"
              image="/images/material-design.png"
              imageAlt="Animation"
              imageHeight={200}
              actions={
                <Button variant="secondary" size="sm" startIcon={<Sparkles className="w-4 h-4" />}>
                  Explore
                </Button>
              }
            >
              <CardText>
                Beautiful animations and micro-interactions powered by Framer Motion for enhanced user experience.
              </CardText>
            </Card>

            <Card
              title="TypeScript"
              subtitle="Type-Safe Development"
              image="/images/typescript.png"
              imageAlt="TypeScript Logo"
              imageHeight={200}
              actions={
                <Button variant="accent" size="sm" startIcon={<Shield className="w-4 h-4" />}>
                  Discover
                </Button>
              }
            >
              <CardText>
                Full TypeScript support for enhanced developer experience, better code quality, and fewer runtime errors.
              </CardText>
            </Card>
          </div>
        </section>
        
        {/* API Demo Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card bg-base-100 shadow-modern-lg glass"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl md:text-3xl gradient-text mb-4">
                <Rocket className="w-8 h-8" />
                Random User API Demo
              </h2>
              <p className="text-base-content/80 mb-6">
                Click the button below to fetch random user data from the public API and see our modern loading states and data presentation.
              </p>
              
              <div className="card-actions">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleFetch}
                  loading={loading}
                  startIcon={!loading ? <Zap className="w-5 h-5" /> : undefined}
                  className="btn-modern"
                >
                  {loading ? 'Fetching...' : 'Fetch Random User'}
                </Button>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* API Response Display */}
        {(apiResponse || apiError) && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="card bg-base-100 shadow-modern glass">
              <div className="card-body">
                <h3 className="card-title text-xl mb-4">API Response Details</h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold">Endpoint:</span>
                    <code className="bg-base-200 px-2 py-1 rounded text-sm">{apiUrl}</code>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Status:</span>
                    <div className={`badge ${apiStatus === 200 ? 'badge-success' : 'badge-error'}`}>
                      {apiStatus} {apiStatus === 200 ? '(OK)' : ''}
                    </div>
                  </div>
                </div>
                
                {apiError && (
                  <Alert 
                    severity="error" 
                    title="API Request Failed"
                    className="mt-4"
                  >
                    {apiError}
                  </Alert>
                )}
                
                {apiResponse && apiResponse.results && apiResponse.results.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-4">Random User Data</h4>
                    
                    <Card
                      title={`${apiResponse.results[0].name.title} ${apiResponse.results[0].name.first} ${apiResponse.results[0].name.last}`}
                      subtitle={apiResponse.results[0].email}
                      image={apiResponse.results[0].picture.large}
                      imageAlt="Random User"
                      imageHeight={200}
                      className="max-w-md"
                    >
                      <CardText>
                        <div className="space-y-2">
                          <div>
                            <span className="font-semibold">Location:</span>{' '}
                            {apiResponse.results[0].location.city}, {apiResponse.results[0].location.country}
                          </div>
                          <div>
                            <span className="font-semibold">Phone:</span>{' '}
                            {apiResponse.results[0].phone}
                          </div>
                        </div>
                      </CardText>
                    </Card>
                    
                    <div className="mt-4">
                      <details className="collapse collapse-arrow bg-base-200">
                        <summary className="collapse-title font-medium">
                          View Raw JSON Response
                        </summary>
                        <div className="collapse-content">
                          <pre className="bg-base-300 p-4 rounded-lg text-sm overflow-auto max-h-64">
                            {JSON.stringify(apiResponse, null, 2)}
                          </pre>
                        </div>
                      </details>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
        
        {/* Footer */}
        <footer className="text-center py-8">
          <div className="divider"></div>
          <p className="text-base-content/60">
            &copy; {new Date().getFullYear()} Next.js Full-Stack Application. Built with ❤️ using Tailwind CSS + DaisyUI.
          </p>
        </footer>
      </div>
    </div>
  );
}
