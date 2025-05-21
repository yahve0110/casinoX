import { RequestHandler, Router } from 'express';
import { validate } from '@/middleware/validate';
import { loginSchema, registerSchema } from '@/validators/authSchema';
import { authController } from '@/controllers/authController';
import { authMiddleware } from '@/middleware/authMiddleware';

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login',validate(loginSchema), authController.login);
authRouter.post('/refresh', authController.refresh);
authRouter.get('/me', authMiddleware, authController.me as RequestHandler);

export default authRouter;
