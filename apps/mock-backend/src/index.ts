import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config.js';
import logger from './logger.js';
import { notFoundHandler, errorHandler } from './middleware/error-handler.js';
import { requestIdMiddleware } from './middleware/request-id.js';
// Import routes
import healthRoutes from './routes/health.js';

// Create Express application
const app = express();

// Apply middleware
app.use(helmet()); // Security headers
app.use(cors(config.cors)); // CORS configuration
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body
app.use(requestIdMiddleware as express.RequestHandler); // Add request ID to each request
app.use(morgan('dev')); // HTTP request logging

// Mount routes
app.use('/api/health', healthRoutes);

// Apply error handling middleware
app.use(notFoundHandler as express.RequestHandler); // Handle 404 errors
app.use(errorHandler as express.ErrorRequestHandler); // Handle all other errors

// Start server
const server = app.listen(config.server.port, () => {
  logger.info(`Server running at http://${config.server.host}:${config.server.port}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled promise rejection', { reason, promise });
  process.exit(1);
});

export default server;
