import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

// Environment variable schema
const envSchema = z.object({
  // Server configuration
  PORT: z.string().default('3001'),
  HOST: z.string().default('localhost'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // CORS configuration
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  
  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
});

// Parse and validate environment variables
const env = envSchema.parse(process.env);

// Configuration object
const config = {
  server: {
    port: parseInt(env.PORT, 10),
    host: env.HOST,
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
  },
  cors: {
    origin: env.CORS_ORIGIN.split(',').map(origin => origin.trim()),
    credentials: true,
  },
  logging: {
    level: env.LOG_LEVEL,
  },
};

export default config;
