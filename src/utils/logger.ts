import winston from 'winston';
import path from 'path';
import fs from 'fs';

const getCallerInfo = winston.format((info) => {
  const error = new Error();
  const stack = error.stack?.split('\n') || [];

  const callerLine = stack.find((line) => {
    return (
      line.includes(process.cwd()) &&
      !line.includes('logger.ts') &&
      !line.includes('node_modules')
    );
  });

  const match = callerLine?.match(/\(([^)]+):(\d+):(\d+)\)/);
  if (match) {
    const fullPath = match[1];
    const line = match[2];
    const relativePath = path.relative(process.cwd(), fullPath);
    info.caller = `${relativePath}:${line}`;
  }

  return info;
});

const colorizer = winston.format.colorize();

// Create the logs directory if it doesn't exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    getCallerInfo(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      const timestamp = info.timestamp;
      const level = colorizer.colorize(
        info.level,
        `[${info.level.toUpperCase()}]`,
      );
      const caller = info.caller ? `[${info.caller}]` : '';
      return `${timestamp} ${level} ${caller} ${info.message}`;
    }),
  ),
  transports: [
    // Console transport
    new winston.transports.Console(),
    // File transport for all logs
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: winston.format.uncolorize(), // Remove colors for the file
    }),
    // File transport only for error logs
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: winston.format.uncolorize(),
    }),
  ],
});

export { logger };
