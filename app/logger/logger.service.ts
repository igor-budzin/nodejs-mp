import winston from 'winston';

export class Logger {
  #logger: winston.Logger;

  constructor() {
    this.#logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: 'error.log',
          level: 'error'
        }),
      ],
    });
  }

  error(msg: string) {
    this.#logger.error(msg);
  }

  warn(msg: string) {
    this.#logger.warn(msg);
  }

  info(msg: string) {
    this.#logger.info(msg);
  }

  http(msg: string) {
    this.#logger.http(msg);
  }

  verbose(msg: string) {
    this.#logger.verbose(msg);
  }

  debug(msg: string) {
    this.#logger.debug(msg);
  }

  silly(msg: string) {
    this.#logger.silly(msg);
  }
}