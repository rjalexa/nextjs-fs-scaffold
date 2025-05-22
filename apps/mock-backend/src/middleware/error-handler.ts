import { Request, Response, NextFunction } from 'express';
import { ApiError } from 'shared';

import logger from '../logger.js';

/**
 * Custom error class for API errors
 */
export class ApiErrorImpl extends Error implements ApiError {
  code: string;
  status: number;
  details?: Record<string, unknown>;

  constructor(code: string, message: string, status = 500, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/**
 * Not found error handler middleware
 * This middleware should be mounted after all routes
 */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  const error = new ApiErrorImpl('not_found', `Route not found: ${req.method} ${req.path}`, 404);
  next(error);
}

/**
 * Global error handler middleware
 * This middleware should be mounted after all other middleware and routes
 */
export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  // Default error values
  let status = 500;
  let code = 'server_error';
  let message = 'Internal server error';
  let details: Record<string, unknown> | undefined = undefined;

  // Log the error
  logger.error(`Error: ${err.message}`, { error: err, path: req.path, method: req.method });

  // Handle API errors
  if (err instanceof ApiErrorImpl) {
    status = err.status;
    code = err.code;
    message = err.message;
    details = err.details;
  }

  // Send error response
  res.status(status).json({
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  });
}
