const checkPermissions = (allowedRoles) => {
    return async (req, res, next) => {
      try {
        // Assuming `req.user` contains the authenticated user retrieved from the database or decoded from a JWT token
        const userRole = req.user.role;
  
        // Check if the user's role is one of the allowed roles
        if (!allowedRoles.includes(userRole)) {
          return res.status(403).json({ error: 'You do not have access to this resource' });
        }
  
        // If user has the necessary permissions, proceed to the next middleware/route handler
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
  };
  