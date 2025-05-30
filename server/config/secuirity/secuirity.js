const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const SALT_ROUNDS = 12;

const securityConfig = {
    hashPassword: async (password) => {
        return await bcrypt.hash(password, SALT_ROUNDS);
    },

    verifyPassword: async (hashedPassword, plainPassword) => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    },

    authLimiter: rateLimit({
        windowMs: 20 * 60 * 1000, 
        max: 15, 
        message: {
            success: false,
            message: 'Too many login attempts. Please try again later.',
            data: null
        }
    }),

    securityMiddleware: (app) => {
        app.use(helmet());
        app.use(cors({
            origin: process.env.ALLOWED_ORIGINS.split(','),
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
    }
};

module.exports = securityConfig;