import { body, param, query } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

export const validateClubId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Club ID is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('Club ID must be a positive integer')
    .toInt(),
  checkValidationResults,
];

export const validateClubQuery = [
  query('page')
    .optional()
    .trim()
    .isInt({ gt: 0 })
    .withMessage('page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .trim()
    .isInt({ gt: 0, lt: 101 })
    .withMessage('limit must be between 1 and 100')
    .toInt(),
  checkValidationResults,
];

export const validateCreateClub = [
  body('name')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Club name is required')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Club name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  checkValidationResults,
];

export const validateUpdateClub = [
  body('name')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Club name cannot be empty')
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage('Club name must be between 3 and 100 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),

  checkValidationResults,
];

export const validateRemoveMember = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Club ID is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('Club ID must be a positive integer')
    .toInt(),
  
  param('userId')
    .trim()
    .notEmpty()
    .withMessage('User ID is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('User ID must be a positive integer')
    .toInt(),
  
  checkValidationResults,
];
