import {
  loginUser,
  registerUser
} from '../services/authService.js';

// member login handler
export async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    
    // validate fields
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required, please make sure to include'
      });
    }
    
    const result = await loginUser(email, password);
    
    // returns member token
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 401) {
      return res.status(401).json({ error: error.message });
    }
    
    // handle anyother error
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// member regi
export async function registerHandler(req, res) {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, password, and name are required'
      });
    }
    
    // emial format 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }
    
    // only ass requirment, must be 6 chars long
    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      });
    }
    
    // check user role
    const validRoles = ['CLUB_MEMBER', 'CLUB_ADMIN', 'API_ADMIN'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        error: 'Invalid role. Must be CLUB_MEMBER, CLUB_ADMIN, or API_ADMIN'
      });
    }
    const result = await registerUser({ email, password, name, role });
    
    res.status(201).json(result);
  } catch (error) {
    // error status is emial does not exists 
    if (error.status === 409) {
      return res.status(409).json({ error: error.message });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}