const jwt = require('jsonwebtoken');

const generateNormalToken = (payload) => {
    return jwt.sign({
        id: payload._id,           
        email: payload.email,   
        role: payload.role,   
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION         
    });
};

module.exports = generateNormalToken;