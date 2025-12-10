import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from '../services/postService.js';

export const create = catchAsync(async (req, res) => {
  const photos = req.files?.map((file) => `/uploads/${file.filename}`) || req.body.photos || [];
  if (!photos.length) {
    throw new AppError('At least one photo is required', 400);
  }

  const postData = {
    userId: req.user._id,
    title: req.body.title,
    description: req.body.description,
    location: typeof req.body.location === 'string' ? JSON.parse(req.body.location) : req.body.location,
    photos
  };

  const post = await createPost(postData);
  res.status(201).json(post);
});

export const list = catchAsync(async (_req, res) => {
  const posts = await getAllPosts();
  res.json(posts);
});

export const detail = catchAsync(async (req, res) => {
  const data = await getPostById(req.params.id);
  res.json(data);
});

export const update = catchAsync(async (req, res) => {
  const updates = { ...req.body };

  if (req.files?.length) {
    updates.photos = req.files.map((file) => `/uploads/${file.filename}`);
  }

  if (updates.location && typeof updates.location === 'string') {
    updates.location = JSON.parse(updates.location);
  }

  const post = await updatePost(req.params.id, req.user._id, updates);
  res.json(post);
});

export const remove = catchAsync(async (req, res) => {
  await deletePost(req.params.id, req.user._id);
  res.status(204).end();
});
