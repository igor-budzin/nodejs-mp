import { ValidationError } from './exceptions/ValidationError.js';
import { EntityAlreadyExist } from './exceptions/EntityAlreadyExist.js';
import { NotFoundError } from './exceptions/NotFound.js';
import { HttpStatuses } from './utils/httpStatuses.js';

const errorsMap = [
  {
    exception: NotFoundError,
    statusCode: HttpStatuses.NOT_FOUND
  },
  {
    exception: ValidationError,
    statusCode: HttpStatuses.BAD_REQUEST
  },
  {
    exception: EntityAlreadyExist,
    statusCode: HttpStatuses.CONFLICT
  },
];

export const erorrHandler = (err, res) => {
  const errorDescription = errorsMap.find((e) => err instanceof e.exception);

  if (!errorDescription) {
    res.statusCode = HttpStatuses.INTERNAL_SERVER_ERROR;
    res.end(JSON.stringify({ error: 'Something went wrong' }));
    console.error(err);
    return;
  }

  const message = err?.message ?? 'Something went wrong';

  res.statusCode = errorDescription.statusCode;
  res.end(JSON.stringify({ error: message }));
};
