import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

export default healthRouter;
