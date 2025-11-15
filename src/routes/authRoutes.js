import express from 'express';

// import for login and signup
import {
  loginHandler,
  registerHandler
} from '../controllers/authController.js';

const router = express.Router();



// POST /api/auth/login (memberr logIn)
router.post('/login', loginHandler);

// POST /api/auth/register (member signUp)
router.post('/register', registerHandler);




export default router;