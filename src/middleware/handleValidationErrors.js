import { validationResult } from 'express-validator';

// Middleware to check validation results and return errors if any
export const checkValidationResults = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      errors: errors.array() 
    });
  }
  
  next();
};
