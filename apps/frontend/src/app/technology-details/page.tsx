'use client';

import { motion } from 'framer-motion';
import { Moon, Sun, Monitor, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Button, Card, CardText, useTheme } from 'ui-components';
import { technologies } from '../shared/technology-data';

/**
 * Technology Details page component
 */
export default function TechnologyDetailsPage() {
  const router = useRouter();
  const { themeMode, setThemeMode } = useTheme();

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

  // Handle back navigation
  const handleBackToMain = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Same Header as Main Page */}
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
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-base-content">
            Technology
            <br />
            <span className="text-primary">Details</span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            Explore the powerful technologies that make up our modern full-stack scaffold
          </p>
        </motion.div>
        
        {/* Technology Cards Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
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

        {/* Back to Main Page Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            variant="primary"
            size="lg"
            startIcon={<ArrowLeft className="w-5 h-5" />}
            onClick={handleBackToMain}
            className="btn-wide"
          >
            Back to Main Page
          </Button>
        </motion.div>
        
        {/* Footer */}
        <footer className="text-center py-8 mt-16">
          <div className="divider"></div>
          <p className="text-base-content/60">
            &copy; {new Date().getFullYear()} Next.js Tailwind DaisyUI Fullstack Scaffold. Built with ❤️
          </p>
        </footer>
      </div>
    </div>
  );
}
