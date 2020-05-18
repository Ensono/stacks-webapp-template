import { createLogger, format, transports, LeveledLogMethod, LogMethod } from 'winston'
const consoleOptions: transports.ConsoleTransportOptions = <transports.ConsoleTransportOptions>{
  handleExceptions: true,
  json: true,
  colorize: true,
}

const consoleFormat = format.printf(
  ({level, message, timestamp, correlation_id}) => {
    return JSON.stringify({
      timestamp: timestamp,
      level: level,
      message: message,
      correlation_id: correlation_id,
    })
  },
)

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: format.combine(
    format.label({correlation_id: 'stage-undefined'} as any),
    format.timestamp(),
    consoleFormat,
  ),
  defaultMeta: {
    service: process.env.POD_NAME || 'default',
  },
  transports: [new transports.Console(consoleOptions)],
})

const Logger = {
  out(type: string, message: any, label: string = 'root') {
    logger.log({level: type, message: message, correlation_id: label})
  },
  info(message: any, label: string = 'root') {
    logger.log({level: 'info', message: message, correlation_id: label})
  },
  debug(message: any, label: string = 'root') {
    logger.log({level: 'debug', message: message, correlation_id: label})
  },
  error(message: any, label: string = 'root') {
    logger.log({level: 'error', message: message, correlation_id: label})
  },
  warn(message: any, label: string = 'root') {
    logger.log({level: 'warn', message: message, correlation_id: label})
  },
  stream: {
    write: function(message: any, encoding: BufferEncoding) {
      logger.info(message)
    },
  }
}

export default Logger
