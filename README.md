# Logger Plugin for Express.js

A self-contained, easy-to-integrate logging solution for Express.js applications using Winston. This plugin allows you to add powerful logging capabilities with minimal setup, including request logging, error logging, and more, without the need for additional dependencies.

---

## Features

- **Self-Contained**: Includes Winston as a dependency, so no extra installation is required.
- **Customizable**: Supports configuration of log level, log directory, and log file names.
- **Request Logging**: Automatically logs incoming HTTP requests.
- **Error Logging**: Logs errors to separate log files for better traceability.
- **Console Logging**: Logs information to the console in addition to files.
- **Easy Integration**: Plug-and-play for any Express.js application.

---

## Installation

Install the plugin using NPM:

```bash
npm install logger-plugin-dev
```

This will install the plugin and include the necessary Winston dependency.

---

## Usage

### Step 1: Integrate into Your Express App

After installing the plugin, you can easily integrate it into your Express application. Below is a sample setup:

```javascript
const express = require('express');
const { createLogger, requestLoggerMiddleware } = require('logger-plugin');

const app = express();

// Create the logger
const logger = createLogger({
  logDir: 'logs',             // Directory where log files are stored
  errorLogFile: 'error.log',  // File for logging errors
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
```

---

### Step 2: Customize Logging Options (Optional)

You can customize the logging behavior by passing options to the `createLogger()` function. Below is an example:

```javascript
const logger = createLogger({
  level: 'debug',                // Log all levels of logs
  logDir: 'logs',                // Directory where log files are stored
  consoleLog: true,              // Enable console logging
  errorLogFile: 'errors.log',    // File for error logs
  combinedLogFile: 'combined.log', // File for general logs
});
```

#### Available Options:

| Option            | Default        | Description                                       |
|-------------------|----------------|---------------------------------------------------|
| `level`           | `info`         | Minimum log level (e.g., `debug`, `warn`, `error`).|
| `logDir`          | `logs`         | Directory where log files are saved.             |
| `consoleLog`      | `true`         | Whether to log to the console.                   |
| `errorLogFile`    | `error.log`    | File name for error logs.                        |
| `combinedLogFile` | `app.log`      | File name for general logs.                      |

---

## Log Files

The plugin automatically creates log files in the specified directory. By default, the logs are stored in the following files:

- **app.log**: Logs all events.
- **error.log**: Logs error messages only.

---

## Folder Structure Example

```
my-project/
├── node_modules/
│   └── logger-plugin/
├── app.js           # Your Express app
├── package.json
├── logs/            # Log directory where log files will be stored
│   ├── app.log
│   └── error.log
└── README.md        # (This file)
```

---

## Contribution

We welcome contributions to improve the plugin! Feel free to open issues or submit pull requests on GitHub.

---

## License

This plugin is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or suggestions, reach out to our team at **developers@cybersolin.com**.

