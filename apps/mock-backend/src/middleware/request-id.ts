import { randomUUID } from 'crypto';

import { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include id property
declare module 'express' {
  interface Request {
    id: string;
  }
}

/**
 * Middleware to add a unique request ID to each request
 * This helps with request tracing and debugging
 */
export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  // Use existing request ID from header if available, or generate a new one
  const requestId = req.headers['x-request-id'] as string || randomUUID();
  
  // Add request ID to request object
  req.id = requestId;
  
  // Add request ID to response headers
  res.setHeader('X-Request-ID', requestId);
  
  next();
}
