// checks user roles to access certian routes

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    try {
      // make sure member exists and is auth
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required. Please log in first.'
        });
      }
      
      // check role
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          error: `Access denied. Required role(s): ${allowedRoles.join(', ')}`
        });
      }
      
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}