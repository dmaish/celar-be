import express from 'express';
import { validate } from '../../middlewares/validationHandler';
import { signupValidator, loginValidator } from '../../utils/validator';
import AuthController from './AuthController';

const AuthRouter = express.Router();

AuthRouter.post(
  '/signup',
  signupValidator,
  validate,
  AuthController.signup
);

AuthRouter.post(
  '/login',
  loginValidator,
  validate,
  AuthController.login
);

export default AuthRouter;
