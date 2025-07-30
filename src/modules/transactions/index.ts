import express from 'express';
import { validate } from '../../middlewares/validationHandler';
import TransactionController from './TransactionController';
import { authenticate } from '../../middlewares/authenticate';
import { transactionValidator } from '../../utils/validator';

const TransactionRouter = express.Router();

TransactionRouter.get(
  '/transactions',
  authenticate,
  validate,
  TransactionController.getTransactions
);

TransactionRouter.post(
  '/send',
  authenticate,
  transactionValidator,
  validate,
  TransactionController.sendTransaction
);

export default TransactionRouter;
