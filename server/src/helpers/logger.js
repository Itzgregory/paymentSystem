const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
);

const logger = createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDir, 'info.log'), level: 'info', options: { flags: 'a' } })
    ],
});

const logwarn = createLogger({
    level: 'warn',
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDir, 'warn.log'), level: 'warn', options: { flags: 'a' } })
    ],
});

const logerror = createLogger({
    level: 'error',
    format: logFormat,
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error', options: { flags: 'a' } })
    ],
});

module.exports = { logger, logwarn, logerror };
