const mongoose = require('mongoose');
const { MONGO_URI } = require('../Env/variables');
const { logger, logerror } = require('../../src/helpers/logger');

const mongoOptions = {
    autoIndex: process.env.NODE_ENV !== 'production',
    connectTimeoutMS: 20000,
    socketTimeoutMS: 60000,
    serverSelectionTimeoutMS: 20000,
    maxPoolSize: 10,
    minPoolSize: 2,
    retryWrites: true,
    retryReads: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

let mainConnection;

const getConnections = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URL is not defined in environment variables");
        }

        if (!mainConnection || mainConnection.readyState !== 1) {
            await mongoose.connect(MONGO_URI, mongoOptions);
            mainConnection = mongoose.connection;

            mainConnection.on('error', err => {
                logerror.error(`MongoDB connection error: ${err}`);
                throw err;
            });

            mainConnection.on('disconnected', () => {
                logger.info('MongoDB disconnected. Attempting to reconnect...');
                setTimeout(getConnections, 5000);
            });

            mainConnection.on('connected', () => {
                logger.info('Successfully connected to MongoDB');
            });

            mongoose.set('debug', (collectionName, method, query, doc) => {
                logger.info(`[Mongoose] ${collectionName}.${method} ${JSON.stringify(query)} ${doc ? JSON.stringify(doc) : ''}`);
            });
        }
        return 'Database connection established';
    } catch (error) {
        logerror.error(`Database connection error: ${error.message}`);
        throw error;
    }
};

module.exports = getConnections;
