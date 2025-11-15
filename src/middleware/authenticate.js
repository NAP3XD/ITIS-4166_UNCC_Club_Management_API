import { verifyToken } from '../services/authService.js';


export async function authenticate(req, res, next) {
  try {
    // gets bearer token from request 
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'no bearer token found'
      });
    }
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided'
      });
    }
    
    const user = await verifyToken(token);
    req.user = user;
    next();

  } catch (error) {
    // 401 status if jwt expired or not correct format
    if (error.status === 401) {
      return res.status(401).json({ error: error.message });
    }
    
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}