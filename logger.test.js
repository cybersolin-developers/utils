const fs = require('fs');
const path = require('path');
const { createLogger, requestLoggerMiddleware } = require('./index');

describe('Logger Plugin', () => {
  const logDir = 'test-logs';
  const errorLogFile = 'test-error.log';
  const combinedLogFile = 'test-combined.log';

  beforeEach(() => {
    if (fs.existsSync(logDir)) {
      fs.rmSync(logDir, { recursive: true, force: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(logDir)) {
      fs.rmSync(logDir, { recursive: true, force: true });
    }
  });

  test('should log error messages to the error file', async () => {
    const logger = createLogger({ logDir, errorLogFile });
    const errorMessage = 'Test error message';

    logger.error(errorMessage);

    const errorFilePath = path.join(logDir, errorLogFile);
    // Wait for log to be written (use a delay to ensure writing)
    await new Promise(resolve => setTimeout(resolve, 500));

    expect(fs.existsSync(errorFilePath)).toBe(true);

    const logContent = fs.readFileSync(errorFilePath, 'utf-8');
    expect(logContent).toContain(errorMessage);
  });

  test('should log info messages to the combined log file', async () => {
    const logger = createLogger({ logDir, combinedLogFile });
    const infoMessage = 'Test info message';

    logger.info(infoMessage);

    const combinedFilePath = path.join(logDir, combinedLogFile);
    // Wait for log to be written (use a delay to ensure writing)
    await new Promise(resolve => setTimeout(resolve, 500));

    expect(fs.existsSync(combinedFilePath)).toBe(true);

    const logContent = fs.readFileSync(combinedFilePath, 'utf-8');
    expect(logContent).toContain(infoMessage);
  });

  test('should include timestamp and log level in log files', async () => {
    const logger = createLogger({ logDir, combinedLogFile });
    const testMessage = 'Test log message';

    logger.info(testMessage);

    const combinedFilePath = path.join(logDir, combinedLogFile);
    // Wait for log to be written (use a delay to ensure writing)
    await new Promise(resolve => setTimeout(resolve, 500));

    const logContent = fs.readFileSync(combinedFilePath, 'utf-8');

    expect(logContent).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/); // Timestamp
    expect(logContent).toContain('INFO'); // Log level
  });

  test('should log incoming requests with middleware', async () => {
    const logger = createLogger({ logDir, combinedLogFile });
    const middleware = requestLoggerMiddleware(logger);

    const req = { method: 'GET', url: '/test' };
    const res = {};
    const next = jest.fn();

    middleware(req, res, next);

    const combinedFilePath = path.join(logDir, combinedLogFile);
    // Wait for log to be written (use a delay to ensure writing)
    await new Promise(resolve => setTimeout(resolve, 500));

    const logContent = fs.readFileSync(combinedFilePath, 'utf-8');
    expect(logContent).toContain('Incoming request: GET /test');
    expect(next).toHaveBeenCalled();
  });

  test('should handle error logging when an error is thrown', async () => {
    const logger = createLogger({ logDir, errorLogFile });
    const errorMessage = 'Test simulated error message';
  
    // Mocking fs.writeFileSync to track the log content directly
    jest.spyOn(fs, 'writeFileSync').mockImplementationOnce((filePath, data) => {
      // Check if the correct data is written
      expect(filePath).toBe(path.join(logDir, errorLogFile));
      expect(data).toContain(errorMessage);  // Check the content written
    });
  
    // Trigger the logger's error method
    logger.error(errorMessage);
  
    // Wait for log to be written (use a delay to ensure writing)
    await new Promise(resolve => setTimeout(resolve, 500));
  
    // Optionally, check if the error log file exists and contains the error message
    const errorFilePath = path.join(logDir, errorLogFile);
    const logContent = fs.readFileSync(errorFilePath, 'utf-8');
    expect(logContent).toContain(errorMessage);
  });
  
  
});
