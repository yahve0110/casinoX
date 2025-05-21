import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '@/errors/ApiError';
import { JwtPayload } from '@/types/jwt';
import { IGetUserAuthInfoRequest } from '@/types/definitionfile';

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization header missing or invalid'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = payload;
    next();
  } catch (err) {
    return next(new ApiError(403, 'Invalid or expired token'));
  }
};
