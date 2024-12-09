import jwt from 'jsonwebtoken';
import { config } from "../config/auth-config.js";
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  // Check if token is provided
  if (!token) {
    return next(errorHandler(401, 'Unauthorized: No token provided'));
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized: Invalid token",
      });
    }

    // Attach the user ID to the request object for use in other middleware/routes
    req.username = decoded.username;
    req.role = decoded.role;
    // Optionally log the user ID for debugging purposes
    console.log(`User ID from token: ${req.username}`);
    console.log(`User Role from token: ${req.role}`);

    // Call the next middleware
    next();
  });
};
