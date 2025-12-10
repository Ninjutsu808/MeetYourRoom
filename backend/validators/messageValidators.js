import { body, param } from 'express-validator';

export const startConversationValidation = [
  body('listingOwnerId').isMongoId().withMessage('Listing owner id is required')
];

export const conversationIdParam = param('conversationId').isMongoId().withMessage('Invalid conversation id');

export const userIdParam = param('userId').isMongoId().withMessage('Invalid user id');

export const sendMessageValidation = [
  body('conversationId').isMongoId().withMessage('Conversation id is required'),
  body('receiverId').isMongoId().withMessage('Receiver id is required'),
  body('text').trim().notEmpty().withMessage('Message text is required')
];
