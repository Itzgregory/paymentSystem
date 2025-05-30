const { logger } = require("../../helpers/logger");

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') { 
        return next(); 
    } else {
        logger.warn('User is not an admin');
        return res.status(403).send({ message: 'Forbidden: You do not have admin privileges' });
    }
};

module.exports = adminMiddleware;
