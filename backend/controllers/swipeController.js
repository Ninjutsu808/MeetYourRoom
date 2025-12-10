import catchAsync from '../utils/catchAsync.js';
import {
  likePost,
  dislikePost,
  getMatches
} from '../services/swipeService.js';

export const like = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await likePost(req.user._id, postId);
  res.json({
    swipe: result.swipe,
    isMatch: result.isMatch,
    post: result.post
  });
});

export const dislike = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await dislikePost(req.user._id, postId);
  res.json(result.swipe);
});

export const matches = catchAsync(async (req, res) => {
  const matchesList = await getMatches(req.user._id);
  res.json(matchesList);
});
