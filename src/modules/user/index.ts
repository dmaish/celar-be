import express from 'express';
import { validate } from '../../middlewares/validationHandler';
import UserController from './UserController';
import { authenticate } from '../../middlewares/authenticate';

const UserRouter = express.Router();

UserRouter.get(
  '/users',
  authenticate,
  validate,
  UserController.getUsers
);

export default UserRouter;