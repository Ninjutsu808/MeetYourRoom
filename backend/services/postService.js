import Post from '../models/Post.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

export const createPost = async (data) => {
  const post = await Post.create(data);
  await User.findByIdAndUpdate(data.userId, { $push: { createdPosts: post._id } });
  return post;
};

export const getAllPosts = async () => {
  const posts = await Post.find()
    .populate('userId', 'name profilePic')
    .sort({ createdAt: -1 });
  return posts.map((post) => ({
    _id: post._id,
    photos: post.photos,
    user: post.userId,
    location: post.location,
    description: post.description,
    title: post.title
  }));
};

export const getPostById = async (postId) => {
  const post = await Post.findById(postId).populate('userId', '-password');
  if (!post) {
    throw new AppError('Post not found', 404);
  }

  return {
    post,
    poster: post.userId
  };
};

export const updatePost = async (postId, userId, updates) => {
  const post = await Post.findOneAndUpdate({ _id: postId, userId }, updates, {
    new: true,
    runValidators: true
  });

  if (!post) {
    throw new AppError('Post not found or not owned by user', 404);
  }

  return post;
};

export const deletePost = async (postId, userId) => {
  const post = await Post.findOneAndDelete({ _id: postId, userId });
  if (!post) {
    throw new AppError('Post not found or not owned by user', 404);
  }

  await User.findByIdAndUpdate(userId, { $pull: { createdPosts: post._id } });

  return post;
};
