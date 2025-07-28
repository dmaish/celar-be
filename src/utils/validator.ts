import { body } from 'express-validator';

export const signupValidator = [
  body('email')
    .isEmail().withMessage('Must be a valid email')
    .normalizeEmail(),
  body('password')
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
        .exists().withMessage('email is required'),
  body('password')
    .exists().withMessage('password is required')
];