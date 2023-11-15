import { Request, Response } from 'express';
import morgan from 'morgan';
import { logger } from '../dependencies.container';

const formatter: morgan.FormatFn<Request, Response> = (tokens, req, res) => {
  return [
    `id: ${req.id}`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
};
export const requestLogger = morgan(formatter, {
  stream: {
    write: (message: string) => logger.info(message)
  }
});
