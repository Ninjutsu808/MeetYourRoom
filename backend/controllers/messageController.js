import catchAsync from '../utils/catchAsync.js';
import {
  getConversationPartners,
  getConversation,
  sendMessage
} from '../services/messageService.js';

export const listConversations = catchAsync(async (req, res) => {
  const partners = await getConversationPartners(req.user._id.toString());
  res.json(partners);
});

export const getConversationWithUser = catchAsync(async (req, res) => {
  const messages = await getConversation(req.user._id, req.params.id);
  res.json(messages);
});

export const sendMessageToUser = catchAsync(async (req, res) => {
  const message = await sendMessage(req.user._id, req.params.id, req.body.message);
  res.status(201).json(message);
});
