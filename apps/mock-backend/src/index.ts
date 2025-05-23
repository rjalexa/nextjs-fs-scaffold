import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import config from './config.js';
import logger from './logger.js';
import { notFoundHandler, errorHandler } from './middleware/error-handler.js';
import { requestIdMiddleware } from './middleware/request-id.js';
import { securityHeaders, rateLimit, validateInput, corsOptions } from './middleware/security.js';
// Import routes
import healthRoutes from './routes/health.js';

// Create Express application
const app = express();

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Apply security middleware
app.use(securityHeaders); // Security headers with helmet
app.use(cors(corsOptions)); // CORS configuration with security options
app.use(rateLimit as express.RequestHandler); // Rate limiting
app.use(express.json({ limit: '10mb' })); // Parse JSON request body
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded request body
app.use(validateInput as express.RequestHandler); // Input validation and sanitization
app.use(requestIdMiddleware as express.RequestHandler); // Add request ID to each request

// Logging middleware
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) },
  skip: (req) => req.url === '/health' || req.url === '/api/health', // Skip health check logs
}));

// Mount routes
app.use('/health', healthRoutes);
app.use('/api/health', healthRoutes);

// Apply error handling middleware
app.use(notFoundHandler as express.RequestHandler); // Handle 404 errors
app.use(errorHandler as express.ErrorRequestHandler); // Handle all other errors

// Start server
const server = app.listen(config.server.port, config.server.host, () => {
  logger.info(`Server running at http://${config.server.host}:${config.server.port}`);
  logger.info(`Environment: ${process.env.NODE_ENV}`);
  logger.info(`CORS origins: ${JSON.stringify(config.cors.origin)}`);
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
