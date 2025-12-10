import catchAsync from '../utils/catchAsync.js';
import {
  startConversation,
  getUserConversations,
  getConversationById,
  sendMessage
} from '../services/messageService.js';

export const startConversationController = catchAsync(async (req, res) => {
  const { listingOwnerId } = req.body;
  const conversation = await startConversation(req.user._id, listingOwnerId);
  res.status(201).json({ conversationId: conversation._id });
});

export const listConversations = catchAsync(async (req, res) => {
  const { userId } = req.params;

  if (userId && userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const conversations = await getUserConversations(req.user._id);
  res.json(conversations);
});

export const getConversationController = catchAsync(async (req, res) => {
  const data = await getConversationById(req.params.conversationId, req.user._id);
  res.json(data);
});

export const sendMessageController = catchAsync(async (req, res) => {
  const { conversationId, receiverId, text } = req.body;

  const message = await sendMessage({
    conversationId,
    senderId: req.user._id,
    receiverId,
    text
  });

  res.status(201).json(message);
});
