import { body, param } from 'express-validator';

export const messageIdValidation = [param('id').isMongoId().withMessage('Invalid user id')];

export const sendMessageValidation = [
  param('id').isMongoId().withMessage('Invalid user id'),
  body('message').trim().notEmpty().withMessage('Message content is required')
];
