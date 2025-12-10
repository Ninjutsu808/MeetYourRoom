import mongoose from 'mongoose';
import Message from '../models/Message.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export const getConversationPartners = async (userId) => {
  const conversations = await Message.aggregate([
    {
      $match: {
        $or: [
          { senderId: new mongoose.Types.ObjectId(userId) },
          { receiverId: new mongoose.Types.ObjectId(userId) }
        ]
      }
    },
    {
      $addFields: {
        otherUser: {
          $cond: [
            { $eq: ['$senderId', new mongoose.Types.ObjectId(userId)] },
            '$receiverId',
            '$senderId'
          ]
        }
      }
    },
    {
      $sort: { timestamp: -1 }
    },
    {
      $group: {
        _id: '$otherUser',
        lastMessage: { $first: '$message' },
        lastTimestamp: { $first: '$timestamp' }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        userId: '$_id',
        name: '$user.name',
        profilePic: '$user.profilePic',
        lastMessage: 1,
        lastTimestamp: 1
      }
    },
    {
      $sort: { lastTimestamp: -1 }
    }
  ]);

  return conversations;
};

export const getConversation = async (userId, partnerId) => {
  const messages = await Message.find({
    $or: [
      { senderId: userId, receiverId: partnerId },
      { senderId: partnerId, receiverId: userId }
    ]
  })
    .sort({ timestamp: 1 })
    .lean();

  return messages;
};

export const sendMessage = async (senderId, receiverId, text) => {
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    throw new AppError('Receiver not found', 404);
  }

  const message = await Message.create({
    senderId,
    receiverId,
    message: text
  });

  return message;
};
