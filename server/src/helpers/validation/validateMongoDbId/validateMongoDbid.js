const mongoose = require('mongoose');
const AppError = require('../../../middlewares/errorhandler/appError');
const { logger } = require('../../../helpers/logger');

const validateMongoDbId = (id) => {
    logger.info('Validating userId from token', { userId: id });
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        logger.warn('Invalid userId format', { userId: id });
        throw new AppError('This ID is not valid or not found', 404);
    }
    return true;
};

module.exports = validateMongoDbId;