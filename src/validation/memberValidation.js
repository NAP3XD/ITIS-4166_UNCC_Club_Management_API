import { body, param, query, validationResult } from 'express-validator';

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

// vali for clubId query parameter
export const validateClubIdQuery = [
  query('clubId')
    .notEmpty()
    .withMessage('Club ID is required')
    .isInt({ min: 1 })
    .withMessage('Club ID must be a positive integer'),
  
  handleValidationErrors
];

// vali for member ID parameter
export const validateMemberId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Member ID must be a positive integer'),
  
  handleValidationErrors
];

// vali rules for creating a member
export const validateCreateMember = [
  body('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  
  body('clubId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Club ID must be a positive integer'),
  
  body('role')
    .optional()
    .isIn(['MEMBER', 'ADMIN', 'OWNER'])
    .withMessage('Invalid role. Must be MEMBER, ADMIN, or OWNER'),
  
  handleValidationErrors
];

// Validation rules for updating a member
export const validateUpdateMember = [
  body('role')
    .optional()
    .isIn(['MEMBER', 'ADMIN', 'OWNER'])
    .withMessage('Invalid role. Must be MEMBER, ADMIN, or OWNER'),
  
  body('joinedAt')
    .optional()
    .isISO8601()
    .withMessage('Invalid date format for joinedAt'),
  
  handleValidationErrors
];
