import express from 'express';
import { userController } from '../dependencies.container';
import { errorCatcher } from '../utils/errorHandler';

const userRouter = express.Router();

userRouter.post('/register',  errorCatcher(async (req, res) => userController.signUp(req, res)));
userRouter.post('/login',  errorCatcher(async (req, res) => userController.signIn(req, res)));

export default userRouter;
