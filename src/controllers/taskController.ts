import { Request, Response, NextFunction } from 'express';
import { taskService } from '@/services/taskService';
import { ApiError } from '@/errors/ApiError';

export const taskController = {
  getAll: (req: Request, res: Response) => {
    const tasks = taskService.getAllTasks();
    res.status(200).json(tasks);
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      if (!title) {
        throw new ApiError(400, 'Title is required');
      }

      const task = taskService.createTask({ title, description });
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },
};
