import {
  loginUser,
  registerUser
} from '../services/authService.js';

// member login handler
export async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    
    const result = await loginUser(email, password);
    
    // returns member token
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 401) {
      return res.status(401).json({ error: error.message });
    }
    
    // handle any other error
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// member registration handler
export async function registerHandler(req, res) {
  try {
    const { email, password, name, role } = req.body;
    
    const result = await registerUser({ email, password, name, role });
    
    res.status(201).json(result);
  } catch (error) {
    // error status if email already exists 
    if (error.status === 409) {
      return res.status(409).json({ error: error.message });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
