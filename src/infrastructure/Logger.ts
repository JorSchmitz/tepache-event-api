import * as winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

const timestampFormat = 'YYYY-MM-DD hh:mm:ss.SSS A';

const serviceContext = {
  service: process.env.npm_package_name,
  version: process.env.npm_package_version,
};

const loggingWinston = new LoggingWinston({ serviceContext });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: serviceContext,
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.STAGE === 'production') {
  logger.add(loggingWinston);
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({
        format: timestampFormat,
      }),
      winston.format.printf(log => `${log.timestamp} [${log.level}]: ${log.message}`),
    ),
  }));
} else {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({
        format: timestampFormat,
      }),
      winston.format.metadata({
        fillExcept: ['message', 'label', 'level', 'timestamp', 'service', 'version'],
      }),
      winston.format.printf(log => {
        log.metadata = JSON.stringify(log.metadata);
        return `${log.timestamp} [${log.level}]: ${log.message}: ${log.metadata}`;
      })
    ),
  }));
}

export default logger;
