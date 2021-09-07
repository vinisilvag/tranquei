import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userController = new UserController();

const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.patch('/:id', userController.enable);

export { userRoutes };
