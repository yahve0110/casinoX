import { Request, Response, NextFunction } from 'express';
import { authService } from '@/services/authService';
import { IGetUserAuthInfoRequest } from '@/types/definitionfile';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await authService.register(email, password);
      res.status(201).json({
        message: 'User registered successfully',
        user,
      });
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const tokens = await authService.login(email, password);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refresh(refreshToken);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  },

  me: async (
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(req.user);
    } catch (err) {
      next(err);
    }
  },
};
