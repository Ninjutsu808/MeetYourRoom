import express from 'express';
import protect from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import {
  messageIdValidation,
  sendMessageValidation
} from '../validators/messageValidators.js';
import {
  listConversations,
  getConversationWithUser,
  sendMessageToUser
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/', protect, listConversations);
router.get('/:id', protect, messageIdValidation, validateRequest, getConversationWithUser);
router.post('/:id', protect, sendMessageValidation, validateRequest, sendMessageToUser);

export default router;
