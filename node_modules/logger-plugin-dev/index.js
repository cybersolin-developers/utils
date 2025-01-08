const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure the log directory exists
const ensureLogDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Create the logger
const createLogger = (options = {}) => {
  const {
    level = 'info',
    logDir = 'logs',
    consoleLog = true,
    errorLogFile = 'error.log',
    combinedLogFile = 'app.log',
  } = options;

  ensureLogDirectory(logDir);

  const transports = [];

  if (consoleLog) {
    transports.push(new winston.transports.Console());
  }

  if (errorLogFile) {
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, errorLogFile),
        level: 'error',
      })
    );
  }

  if (combinedLogFile) {
    transports.push(
      new winston.transports.File({
        filename: path.join(logDir, combinedLogFile),
      })
    );
  }

  return winston.createLogger({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ level, message, timestamp, stack }) => {
        return stack
          ? `[${timestamp}] ${level.toUpperCase()}: ${message}\n${stack}`
          : `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      })
    ),
    transports,
  });
};

// Middleware for request logging
const requestLoggerMiddleware = (logger) => (req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
};

module.exports = { createLogger, requestLoggerMiddleware };

