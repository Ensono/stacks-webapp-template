import * as winston from 'winston'
const options = {
  handleExceptions: true,
  json: true,
  colorize: true,
}

const consoleFormat = winston.format.printf(
  ({level, message, timestamp, correlation_id}) => {
    return JSON.stringify({
      timestamp: timestamp,
      level: level,
      message: message,
      correlation_id: correlation_id,
    })
  },
)

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: winston.format.combine(
    winston.format.label({correlation_id: 'stage-undefined'} as any),
    winston.format.timestamp(),
    consoleFormat,
  ),
  defaultMeta: {
    service: process.env.POD_NAME || process.env.FNC_NAME || 'default',
  },
  transports: [new winston.transports.Console(options)],
})

const Logger = {
  out(type, message, label = 'root') {
    logger.log({level: type, message: message, correlation_id: label})
  },
  info(message, label = 'root') {
    logger.log({level: 'info', message: message, correlation_id: label})
  },
  debug(message, label = 'root') {
    logger.log({level: 'debug', message: message, correlation_id: label})
  },
  error(message, label = 'root') {
    logger.log({level: 'error', message: message, correlation_id: label})
  },
  warn(message, label = 'root') {
    logger.log({level: 'warn', message: message, correlation_id: label})
  },
  stream: {
    write: function(message, encoding) {
      logger.info(message)
    },
  },
}

export default Logger
