/**
 * Middleware to check if the user is authenticated to view dashboard
 * If authenticated, call the next middleware in the chain
 * If not authenticated, send a 401 status with 'Access Denied' message
 */
exports.isLoggedIn = function (req, res, next) 
 // Check if there is a user object in the request (user is authenticated)
    if(req.user) {
     // If authenticated, call the next middleware in the chain
      next();
    } else {
    // If not authenticated, send a 401 status with 'Access Denied' message
      return res.status(401).send('Access Denied');
    }
  }
