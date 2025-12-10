import Swipe from '../models/Swipe.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const ensurePostExists = async (postId) => {
  const post = await Post.findById(postId).populate('userId');
  if (!post) {
    throw new AppError('Post not found', 404);
  }
  return post;
};

const getUserPostIds = async (userId) => {
  const posts = await Post.find({ userId }).select('_id');
  return posts.map((p) => p._id);
};

const checkMutualLike = async (userId, otherUserId) => {
  if (!otherUserId) return false;
  const myPostIds = await getUserPostIds(userId);
  if (myPostIds.length === 0) return false;

  const mutual = await Swipe.exists({
    userId: otherUserId,
    postId: { $in: myPostIds },
    action: 'like'
  });

  return Boolean(mutual);
};

export const likePost = async (userId, postId) => {
  const post = await ensurePostExists(postId);

  const swipe = await Swipe.findOneAndUpdate(
    { userId, postId },
    { action: 'like' },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  const isMatch = await checkMutualLike(userId, post.userId?._id);

  return { swipe, isMatch, post };
};

export const dislikePost = async (userId, postId) => {
  const post = await ensurePostExists(postId);

  const swipe = await Swipe.findOneAndUpdate(
    { userId, postId },
    { action: 'dislike' },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return { swipe, post };
};

export const getMatches = async (userId) => {
  const likedSwipes = await Swipe.find({ userId, action: 'like' }).populate({
    path: 'postId',
    populate: { path: 'userId', select: 'name profilePic phone email branch college course enrolmentNumber socialLinks' }
  });

  const myPostIds = await getUserPostIds(userId);

  return Promise.all(
    likedSwipes.map(async (swipe) => {
      const post = swipe.postId;
      if (!post) return null;

      const mutual = myPostIds.length
        ? await Swipe.exists({
            userId: post.userId?._id,
            postId: { $in: myPostIds },
            action: 'like'
          })
        : false;

      return {
        post,
        isMatch: Boolean(mutual)
      };
    })
  ).then((results) => results.filter(Boolean));
};
