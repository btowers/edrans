import winston from 'winston'

class Logger {
  logger: winston.Logger
  private colorizer = winston.format.colorize()

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.simple(),
            winston.format.printf((msg) =>
              this.colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
            )
          ),
        }),
        new winston.transports.File({
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.prettyPrint()
          ),
          filename: './logs/all.log',
          level: 'info',
        }),
      ],
    })
  }
}

export const loggerS = new Logger().logger
