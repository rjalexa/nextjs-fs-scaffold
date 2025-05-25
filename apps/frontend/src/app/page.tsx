'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, Rocket } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';
import { Button, Card, CardText, Alert, useTheme } from 'ui-components';

import { technologies } from './shared/technology-data';

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
  const router = useRouter();
  
  // Theme state
  const { themeMode, setThemeMode } = useTheme();
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // API response state
  const [apiResponse, setApiResponse] = useState<RandomUserResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // Handle fetch button click
  const handleFetch = async () => {
    setLoading(true);
    
    // Reset previous API response data
    setApiResponse(null);
    setApiError(null);
    
    try {
      const response = await fetch('https://randomuser.me/api/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('API request failed:', error);
      setApiError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const modes: Array<'light' | 'dark' | 'system'> = ['system', 'light', 'dark'];
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

  // Handle navigation to technology details
  const handleTechnologyClick = () => {
    router.push('/technology-details');
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Theme Selector at Top */}
      <div className="navbar bg-base-100 border-b border-base-300">
        <div className="navbar-start">
          <div className="text-xl font-bold text-base-content">
            Next.js Scaffold
          </div>
        </div>
        <div className="navbar-end">
          <Button 
            variant="ghost" 
            size="sm"
            startIcon={getThemeIcon()}
            onClick={toggleTheme}
            className="capitalize gap-2"
          >
            {themeMode}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-base-content">
            Next.js Tailwind DaisyUI
            <br />
            <span className="text-primary">Fullstack Scaffold</span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            A modern, production-ready scaffold featuring the best tools for building full-stack applications
          </p>
        </motion.div>
        
        {/* Technology Cards Section */}
        <section className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-base-content"
          >
            Technologies
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {technologies
              .filter(tech => 
                tech.name.includes('Next.js') || 
                tech.name.includes('Tailwind') || 
                tech.name.includes('DaisyUI')
              )
              .map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  title={tech.name}
                  image={tech.image}
                  imageAlt={`${tech.name} Logo`}
                  actions={
                    <Button 
                      variant={tech.variant} 
                      size="sm" 
                      startIcon={<tech.iconComponent className="w-4 h-4" />}
                      onClick={handleTechnologyClick}
                      className={`w-full ${tech.name === 'TypeScript' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black border-none shadow-lg hover:shadow-xl transition-all duration-300' : ''}`}
                    >
                      Learn More
                    </Button>
                  }
                >
                  <CardText>
                    {tech.description}
                  </CardText>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technologies Details Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-16"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleTechnologyClick}
            className="btn-wide"
          >
            Technologies Details
          </Button>
        </motion.div>
        
        {/* API Demo Section with Hero Component */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="hero bg-base-200 rounded-box">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <div className="flex justify-center mb-4">
                    <Rocket className="w-16 h-16 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-base-content mb-4">
                    Random User API Demo
                  </h2>
                  <p className="text-base-content/70 mb-6">
                    Test our API integration by fetching random user data from a public API. 
                    See modern loading states and beautiful data presentation.
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleFetch}
                    loading={loading}
                    startIcon={!loading ? <Rocket className="w-5 h-5" /> : undefined}
                    className="btn-wide"
                  >
                    {loading ? 'Fetching User...' : 'Fetch Random User'}
                  </Button>
                </div>
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
            {apiError && (
              <Alert 
                severity="error" 
                title="API Request Failed"
                className="mb-6"
              >
                {apiError}
              </Alert>
            )}
            
            {apiResponse && apiResponse.results && apiResponse.results.length > 0 && (
              <div className="hero bg-base-200 rounded-box">
                <div className="hero-content flex-col lg:flex-row">
                  <div className="w-64 h-64 flex-shrink-0">
                    <Image 
                      src={apiResponse.results[0].picture.large} 
                      alt="Random User"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover rounded-lg shadow-2xl" 
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-base-content">
                      {apiResponse.results[0].name.title} {apiResponse.results[0].name.first} {apiResponse.results[0].name.last}
                    </h3>
                    <div className="py-6 space-y-2 text-base-content/80">
                      <p><span className="font-semibold">Email:</span> {apiResponse.results[0].email}</p>
                      <p><span className="font-semibold">Phone:</span> {apiResponse.results[0].phone}</p>
                      <p><span className="font-semibold">Location:</span> {apiResponse.results[0].location.city}, {apiResponse.results[0].location.country}</p>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100">
                      <input type="checkbox" /> 
                      <div className="collapse-title text-lg font-medium">
                        View Raw JSON Response
                      </div>
                      <div className="collapse-content"> 
                        <pre className="bg-base-300 p-4 rounded-lg text-sm overflow-auto max-h-64 text-base-content">
                          {JSON.stringify(apiResponse, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        )}
        
        {/* Footer */}
        <footer className="text-center py-8">
          <div className="divider"></div>
          <p className="text-base-content/60">
            &copy; {new Date().getFullYear()} Next.js Tailwind DaisyUI Fullstack Scaffold. Built with ❤️
          </p>
        </footer>
      </div>
    </div>
  );
}
