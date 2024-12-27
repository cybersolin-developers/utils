Winston Logger Plugin for Express.js

A self-contained, easy-to-integrate logging solution for Express.js applications using Winston. This plugin allows you to add powerful logging capabilities with minimal setup, including request logging, error logging, and more, without the need for users to install additional dependencies.

Features

Self-Contained: Includes Winston as a dependency, so no extra installation is required.

Customizable: Supports log level, log directory, and log file names configuration.

Request Logging: Automatically logs incoming HTTP requests.

Error Logging: Logs errors to separate log files.

Console Logging: Logs information to the console in addition to files.

Easy Integration: Plug-and-play for any Express.js application.


Installation

Step 1: Install the Plugin
To install the plugin, simply run the following command:

npm install logger-plugin
This will install the plugin and automatically include the necessary Winston dependency.


Usage

Step 2: Integrate into Your Express App
After installing the plugin, you can easily integrate it into your Express application. Below is a sample integration:

--------------------------------------------------------------------------------
const express = require('express');
const { createLogger, requestLoggerMiddleware } = require('logger-plugin');

const app = express();

// Create the logger
const logger = createLogger({
  logDir: 'logs',            // Directory where log files are stored
  errorLogFile: 'error.log', // File for logging errors
  combinedLogFile: 'app.log', // File for logging all events
});

// Use request logging middleware
app.use(requestLoggerMiddleware(logger));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, world!');
  logger.info('Responded to / with "Hello, world!"');
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`, { stack: err.stack });
  res.status(500).send('Something went wrong');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

---------------------------------------------------------------------------------

Step 3: Customize Logging Options (Optional)

You can customize the logging behavior by passing different options to the createLogger() function. Here's a breakdown of the available options:

level: The minimum log level (default is info). Other options include debug, warn, error, etc.

logDir: The directory where log files will be saved (default is logs).

consoleLog: Whether to log to the console (default is true).

errorLogFile: The name of the file to log error messages (default is error.log).

combinedLogFile: The name of the file to log general events (default is app.log).

---------------------------------------------------------------------------------------

Example:

const logger = createLogger({
  level: 'debug',               // Log all levels of logs
  logDir: 'logs',               // Directory where log files are stored
  consoleLog: true,              // Enable console logging
  errorLogFile: 'errors.log',   // File for error logs
  combinedLogFile: 'combined.log', // File for general logs
});

---------------------------------------------------------------------------------------


Log Files

The plugin will automatically create log files in the specified log directory. By default, the logs are stored in the following files:

app.log: Logs all events.
error.log: Logs error messages only.
Contribution

------------------------------------------------------------------------------------------
Feel free to open issues or submit pull requests to improve the plugin. Contributions are welcome!

License

This plugin is licensed under the MIT License.

Contact

If you have any questions or suggestions, feel free to reach out to team at [developers@cybersolin.com].
-----------------------------------------------------------------------
Folder Structure Example
my-project/
├── node_modules/
│   └── logger-plugin/
├── app.js           # Your Express app
├── package.json
├── logs/            # Log directory where log files will be stored
│   ├── app.log
│   └── error.log
└── README.md        # (This file)
------------------------------------------------------------------------

By following this setup, developers can easily integrate the plugin, and customize logging for their applications without the hassle of manually installing and configuring Winston.