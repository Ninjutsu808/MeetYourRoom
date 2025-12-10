import mongoose from 'mongoose';

const swipeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    action: { type: String, enum: ['like', 'dislike'], required: true }
  },
  {
    timestamps: true
  }
);

swipeSchema.index({ userId: 1, postId: 1 }, { unique: true });

const Swipe = mongoose.model('Swipe', swipeSchema);

export default Swipe;
