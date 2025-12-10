import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length === 2,
        message: 'Conversation must have exactly two participants'
      }
    },
    lastMessage: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

conversationSchema.index({ participants: 1 }, { unique: true });

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
