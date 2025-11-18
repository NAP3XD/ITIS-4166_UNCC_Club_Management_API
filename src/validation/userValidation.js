import { body, param, validationResult } from 'express-validator';

// vali middleware to handle errors
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: errors.array()[0].msg 
    });
  }
  next();
};

// vali for user ID parameter
export const validateUserId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  
  handleValidationErrors
];

// vali rules for creating a user
export const validateCreateUser = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  
  body('role')
    .optional()
    .isIn(['CLUB_MEMBER', 'CLUB_ADMIN', 'API_ADMIN'])
    .withMessage('Invalid role. Must be CLUB_MEMBER, CLUB_ADMIN, or API_ADMIN'),
  
  handleValidationErrors
];

// vali rules for updating a user
export const validateUpdateUser = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  
  body('role')
    .optional()
    .isIn(['CLUB_MEMBER', 'CLUB_ADMIN', 'API_ADMIN'])
    .withMessage('Invalid role. Must be CLUB_MEMBER, CLUB_ADMIN, or API_ADMIN'),
  
  body('password')
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  handleValidationErrors
];

// vali rules for updating own profile
export const validateUpdateProfile = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  
  handleValidationErrors
];
