import express from 'express';

// import for login and signup
import {
  loginHandler,
  registerHandler
} from '../controllers/authController.js';

// import validation middleware
import { 
  validateRegister, 
  validateLogin 
} from '../validation/authValidation.js';

const router = express.Router();



// POST /api/auth/register (member signUp)
router.post('/register', validateRegister, registerHandler);

// POST /api/auth/login (memberr logIn)
router.post('/login', validateLogin, loginHandler);




export default router;
