import { z } from 'zod';

/**
 * Backend environment schema
 */
export const backendEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  BACKEND_PORT: z.coerce.number().default(8000),
  HOST: z.string().default('localhost'),
  CORS_ORIGIN: z.string().optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  API_RATE_LIMIT: z.coerce.number().default(100),
  JWT_SECRET: z.string().default('your-secret-key'),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
});

/**
 * Frontend environment schema
 */
export const frontendEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  FRONTEND_PORT: z.coerce.number().default(3000),
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:8000'),
});

/**
 * Backend environment type
 */
export type BackendEnv = z.infer<typeof backendEnvSchema>;

/**
 * Frontend environment type
 */
export type FrontendEnv = z.infer<typeof frontendEnvSchema>;

/**
 * Validate environment variables using a schema
 * @param schema Zod schema to validate against
 * @returns Parsed and validated environment variables
 */
export function validateEnv<T extends z.ZodTypeAny>(schema: T): z.infer<T> {
  const result = schema.safeParse(process.env);
  
  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.format());
    throw new Error('Invalid environment variables');
  }
  
  return result.data;
}
