import * as winston from "winston";
const options = {
  handleExceptions: true,
  json: true,
  colorize: true,
};

const consoleFormat = winston.format.printf(
  ({ level, message, timestamp, correlation_id }) => {
    return JSON.stringify({
      timestamp: timestamp,
      level: level,
      message: message,
      correlation_id: correlation_id
    });
  }
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  // format: winston.format.json(),
  format: winston.format.combine(
    winston.format.label({ correlation_id: "stage-undefined" } as any),
    winston.format.timestamp(),
    consoleFormat
  ),
  defaultMeta: {
    service: process.env.POD_NAME || process.env.FNC_NAME || "default"
  },
  transports: [new winston.transports.Console(options)]
});

export const Logger = {
  _out(type, message, label) {
    logger.log({ level: type, message: message, correlation_id: label });
  },
  _info(message, label) {
    logger.log({ level: "info", message: message, correlation_id: label });
  },
  _debug(message, label) {
    logger.log({ level: "debug", message: message, correlation_id: label });
  },
  _error(message, label) {
    logger.log({ level: "error", message: message, correlation_id: label });
  },
  stream: {
    write: function(message, encoding) {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      logger.info(message);
    }
  }
};
