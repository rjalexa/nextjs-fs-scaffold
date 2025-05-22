import { Router } from 'express';
import { ApiResponse } from 'shared';

const router: Router = Router();

/**
 * Health check endpoint
 * GET /api/health
 */
router.get('/', (_req, res) => {
  const healthData: ApiResponse<{
    status: string;
    timestamp: string;
    environment: string;
    uptime: number;
  }> = {
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
    },
    success: true,
    timestamp: new Date().toISOString(),
  };

  res.json(healthData);
});

export default router;
