// API contracts and endpoints

import { z } from 'zod';

import type { HealthCheckResponse } from '../types';

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  // Add more endpoints as needed
} as const;

/**
 * Health check response schema
 */
export const healthCheckResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  version: z.string(),
  timestamp: z.string(),
  environment: z.string(),
  uptime: z.number(),
});

/**
 * Type guard for health check response
 * @param data Data to validate
 * @returns Whether the data is a valid health check response
 */
export function isHealthCheckResponse(data: unknown): data is HealthCheckResponse {
  return healthCheckResponseSchema.safeParse(data).success;
}

/**
 * Generic API response schema
 */
export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    message: z.string().optional(),
    timestamp: z.string(),
  });

/**
 * API error schema
 */
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.unknown()).optional(),
});

/**
 * Pagination params schema
 */
export const paginationParamsSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive().max(100),
});

/**
 * Paginated response schema
 */
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  apiResponseSchema(z.array(itemSchema)).extend({
    pagination: z.object({
      total: z.number().int().nonnegative(),
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      totalPages: z.number().int().nonnegative(),
    }),
  });
