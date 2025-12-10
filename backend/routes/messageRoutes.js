import express from 'express';
import protect from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import {
  startConversationValidation,
  conversationIdParam,
  userIdParam,
  sendMessageValidation
} from '../validators/messageValidators.js';
import {
  startConversationController,
  listConversations,
  getConversationController,
  sendMessageController
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/start-conversation', protect, startConversationValidation, validateRequest, startConversationController);
router.get('/conversation/:conversationId', protect, conversationIdParam, validateRequest, getConversationController);
router.post('/send', protect, sendMessageValidation, validateRequest, sendMessageController);
router.get('/:userId', protect, userIdParam, validateRequest, listConversations);

export default router;
