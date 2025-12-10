import mongoose from 'mongoose';

const socialLinksSchema = new mongoose.Schema(
  {
    instagram: { type: String },
    linkedin: { type: String }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String },
    password: { type: String, required: true },
    branch: { type: String },
    college: { type: String },
    course: { type: String },
    enrolmentNumber: { type: String },
    profilePic: { type: String },
    socialLinks: socialLinksSchema,
    createdPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
