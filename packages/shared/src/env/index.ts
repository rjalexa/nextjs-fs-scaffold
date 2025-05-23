import { z } from 'zod';

// Frontend environment schema
export const frontendEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  FRONTEND_PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('3000'),
});

// Backend environment schema
export const backendEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('3001'),
  HOST: z.string().default('localhost'),
  CORS_ORIGIN: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(32).optional(),
  API_RATE_LIMIT: z.string().transform(Number).pipe(z.number().positive()).default('100'),
});

// Shared environment validation function
export function validateEnv<T extends z.ZodSchema>(
  schema: T,
  env: Record<string, string | undefined> = process.env
): z.infer<T> {
  try {
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      
      throw new Error(`Environment validation failed:\n${errorMessage}`);
    }
    throw error;
  }
}

// Type exports
export type FrontendEnv = z.infer<typeof frontendEnvSchema>;
export type BackendEnv = z.infer<typeof backendEnvSchema>;
