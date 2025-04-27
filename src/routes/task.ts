import { Router } from 'express';
import { taskController } from '@/controllers/taskController';

const taskRouter = Router();

taskRouter.get('/', taskController.getAll);
taskRouter.post('/', taskController.create);

export default taskRouter;
