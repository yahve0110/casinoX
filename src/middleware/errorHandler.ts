import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@/errors/ApiError';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error('🔴 Global error:', err);
  let status = 500;
  let message = 'Internal Server Error';

  if (err instanceof ApiError) {
    status = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message || message;
  } else if (err.statusCode) {
    status = err.statusCode;
    message = err.message;
  } else if (err.status) {
    status = err.status;
    message = err.message;
  }

  res.status(status).json({
    success: false,
    message,
    statusCode: status,
  });
}
