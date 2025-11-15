import { body, param, query } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

// Validate :id param for routes like GET/PUT/DELETE /announcement/:id
export const validateAnnouncementId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Announcement ID is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('Announcement ID must be a positive integer')
    .toInt(),
  checkValidationResults,
];

// Validate query params for GET /announcement
export const validateAnnouncementQuery = [
  query('clubId')
    .optional()
    .trim()
    .isInt({ gt: 0 })
    .withMessage('clubId must be a positive integer')
    .toInt(),
  checkValidationResults,
];

// Validate body for POST /announcement
export const validateCreateAnnouncement = [
  body('clubId')
    .notEmpty()
    .withMessage('clubId is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('clubId must be a positive integer')
    .toInt(),

  body('title')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage('Title must be between 3 and 150 characters'),

  body('content')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Content is required')
    .bail()
    .isLength({ min: 3, max: 5000 })
    .withMessage('Content must be between 3 and 5000 characters'),

  checkValidationResults,
];

// Validate body for PUT /announcement/:id
export const validateUpdateAnnouncement = [
  body('title')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage('Title must be between 3 and 150 characters'),

  body('content')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Content cannot be empty')
    .bail()
    .isLength({ min: 3, max: 5000 })
    .withMessage('Content must be between 3 and 5000 characters'),

  body('clubId')
    .optional()
    .notEmpty()
    .withMessage('clubId cannot be empty')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('clubId must be a positive integer')
    .toInt(),

  checkValidationResults,
];
