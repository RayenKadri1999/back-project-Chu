import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js'; // Assuming you have a custom error handler

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Check if the token is available from the authorization header
        const token = req.headers["x-access-token"];

        if (!token) {
            console.log("No token")
            return next(errorHandler(401, 'Unauthorized: No token provided'));
        }

        // Verify the token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).send({
                    message: "Forbidden: Invalid token",
                });
            }

            // Check if the user's role (decoded from the token) is in the allowed roles
            if (!roles.includes(decoded.role)) {
                return res.status(403).send({
                    message: "Forbidden: You do not have the required role",
                });
            }

            // If the user has the correct role, proceed to the next middleware or route handler
            next();
        });
    };
};
