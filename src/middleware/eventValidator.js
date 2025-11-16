import { body, param, query } from 'express-validator';
import { checkValidationResults } from './handleValidationErrors.js';

// vali :id param for routes: GET/PUT/DELETE /events/:id
export const validateEventId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('Event ID is required')
    .bail()
    .isInt({ gt: 0 })
    .withMessage('Event ID must be a positive integer')
    .toInt(),
  checkValidationResults,
];

// vali query params for GET /events
export const validateEventQuery = [
  query('clubId')
    .optional()
    .trim()
    .isInt({ gt: 0 })
    .withMessage('clubId must be a positive integer')
    .toInt(),
  checkValidationResults,
];

// vali body for POST /events
export const validateCreateEvent = [
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

  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters'),

  body('location')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 255 })
    .withMessage('Location must not exceed 255 characters'),

  body('eventDate')
    .notEmpty()
    .withMessage('Event date is required')
    .bail()
    .isISO8601()
    .withMessage('Event date must be a valid ISO 8601 date')
    .bail()
    .custom((value) => {
      const eventDate = new Date(value);
      const now = new Date();
      if (eventDate < now) {
        throw new Error('Event date must be in the future');
      }
      return true;
    }),

  checkValidationResults,
];

// Vali body for PUT /events/:id
export const validateUpdateEvent = [
  body('title')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage('Title must be between 3 and 150 characters'),

  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters'),

  body('location')
    .optional()
    .trim()
    .escape()
    .isLength({ max: 255 })
    .withMessage('Location must not exceed 255 characters'),

  body('eventDate')
    .optional()
    .isISO8601()
    .withMessage('Event date must be a valid ISO 8601 date')
    .bail()
    .custom((value) => {
      if (value) {
        const eventDate = new Date(value);
        const now = new Date();
        if (eventDate < now) {
          throw new Error('Event date must be in the future');
        }
      }
      return true;
    }),

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

// vali body for POST/PUT /events/:id/rsvp
export const validateRSVP = [
  body('status')
    .optional()
    .isIn(['ATTENDING', 'NOT_ATTENDING', 'MAYBE'])
    .withMessage('Status must be one of: ATTENDING, NOT_ATTENDING, MAYBE'),
  checkValidationResults,
];
