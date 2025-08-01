import { body } from 'express-validator';

export const signupValidator = [
  body('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(),
  body('password')
    .exists().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Must contain a lowercase letter')
    .matches(/\d/).withMessage('Must contain a number')
    .matches(/[!@#$%^&*]/).withMessage('Must contain a special character'),
  body('role')
    .exists().withMessage('Role is required')
    .isIn(['DEV', 'PSP']).withMessage('Role must be either DEV or PSP'),
];

export const loginValidator = [
  body('email')
        .exists().withMessage('email is required')
        .isEmail().withMessage('Must be a valid email')
        .normalizeEmail(),
  body('password')
    .exists().withMessage('password is required')
];

// receipientId should be uuid and amount should be a positive number
export const transactionValidator = [
  body('recipientId')
    .exists().withMessage('Recipient ID is required')
    .isUUID().withMessage('Recipient ID must be a UUID'),
  body('amount')
    .exists().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
  body('currency')
    .exists().withMessage('Currency is required')
    .isIn(['KES', 'USD']).withMessage('Currency must be either KES or USD')
];