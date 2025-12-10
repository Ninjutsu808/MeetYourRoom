import { validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors
      .array()
      .map((err) => err.msg)
      .join(', ');
    return next(new AppError(message, 400));
  }
  next();
};

export default validateRequest;
