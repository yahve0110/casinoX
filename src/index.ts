import 'tsconfig-paths/register';
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import taskRouter from '@/routes/task';
import { errorHandler } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';
import healthRouter from '@/routes/healthRouter';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  }),
);
app.use(express.json());

// routes
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/health', healthRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
