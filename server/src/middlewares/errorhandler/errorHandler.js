const AppError = require('./appError');
const { logger, logwarn, logerror } = require('../../helpers/logger');

const notFound = (req, res, next) => {
  const error = new AppError(`Not Found: ${req.originalUrl}`, 404);
  next(error);
};


const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    logger.error({
      error: message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userId: req.user?.id || 'unauthenticated'
    });
  
    res.status(statusCode).json({
      success: false,
      message,
      data: {} || null
    });
  };

module.exports = { errorHandler, notFound };