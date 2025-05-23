import dotenv from 'dotenv';
import { validateEnv, backendEnvSchema, type BackendEnv } from 'shared';

// Load environment variables from .env file
dotenv.config();

// Parse and validate environment variables using shared schema
const env: BackendEnv = validateEnv(backendEnvSchema);

// Configuration object
const config = {
  server: {
    port: typeof env.PORT === 'string' ? parseInt(env.PORT, 10) : env.PORT,
    host: env.HOST,
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
  },
  cors: {
    origin: env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',').map(origin => origin.trim()) : ['http://localhost:3000'],
    credentials: true,
  },
  logging: {
    level: env.LOG_LEVEL,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: env.API_RATE_LIMIT,
  },
  security: {
    jwtSecret: env.JWT_SECRET,
  },
  database: {
    url: env.DATABASE_URL,
  },
  redis: {
    url: env.REDIS_URL,
  },
};

export default config;
