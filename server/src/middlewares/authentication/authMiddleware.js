const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const authMiddleware = asyncHandler(async (req, res, next) => {
    // Check for token in both cookie and Authorization header for flexibility
    let token = null;
    
    // Check Authorization header first (Bearer token)
    const authHead = req.headers.authorization;
    if (authHead?.startsWith('Bearer ')) {
        token = authHead.split(' ')[1];
    }
    
    // If no token in header, check for cookie
    if (!token && req.cookies.auth_token) {
        token = req.cookies.auth_token;
    }
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authenticated: No token provided',
            data: {} || null
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        
        if (req.get('upgrade') === 'websocket') {
            req.socket.join(decoded.id.toString());
        }
        
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: 'Not Authorized: Token is expired. Please login again',
                data: {} || null
            });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
                data: {} || null
            });
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            data: {} || null
        });
    }
});

module.exports = { authMiddleware };