import mongoose from 'mongoose';
import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import AppError from '../utils/AppError.js';

const sortParticipantIds = (ids) =>
  ids.map((id) => new mongoose.Types.ObjectId(id)).sort((a, b) => a.toString().localeCompare(b.toString()));

export const startConversation = async (userId, otherUserId) => {
  if (userId.toString() === otherUserId.toString()) {
    throw new AppError('Cannot start a conversation with yourself', 400);
  }

  const participants = sortParticipantIds([userId, otherUserId]);

  const conversation = await Conversation.findOneAndUpdate(
    { participants },
    { $setOnInsert: { participants, lastMessage: '' } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return conversation;
};

export const getUserConversations = async (userId) => {
  const conversations = await Conversation.find({ participants: userId })
    .populate('participants', 'name profilePic email phone socialLinks')
    .sort({ updatedAt: -1 })
    .lean();

  return conversations.map((conversation) => {
    const otherParticipant = conversation.participants.find(
      (participant) => participant._id.toString() !== userId.toString()
    );

    return {
      _id: conversation._id,
      lastMessage: conversation.lastMessage,
      updatedAt: conversation.updatedAt,
      participant: otherParticipant
    };
  });
};

export const getConversationById = async (conversationId, userId) => {
  const conversation = await Conversation.findById(conversationId)
    .populate('participants', 'name profilePic email phone socialLinks')
    .lean();

  if (!conversation) {
    throw new AppError('Conversation not found', 404);
  }

  const isParticipant = conversation.participants.some(
    (participant) => participant._id.toString() === userId.toString()
  );

  if (!isParticipant) {
    throw new AppError('Not authorized to view this conversation', 403);
  }

  const messages = await Message.find({ conversationId }).sort({ timestamp: 1 }).lean();

  return {
    conversation,
    messages
  };
};

export const sendMessage = async ({ conversationId, senderId, receiverId, text }) => {
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new AppError('Conversation not found', 404);
  }

  const participantIds = conversation.participants.map((participant) => participant.toString());

  if (!participantIds.includes(senderId.toString()) || !participantIds.includes(receiverId.toString())) {
    throw new AppError('Participants mismatch for this conversation', 403);
  }

  const message = await Message.create({
    conversationId,
    senderId,
    receiverId,
    text
  });

  conversation.lastMessage = text;
  await conversation.save();

  return message;
};
