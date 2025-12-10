import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: locationSchema, required: true },
    photos: [{ type: String, required: true }]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
