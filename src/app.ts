import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import authRouter from '@/routes/authRouter';
import { errorHandler } from '@/middleware/errorHandler';
import healthRouter from '@/routes/healthRouter';

dotenv.config();

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  }),
);
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
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

export { app };
