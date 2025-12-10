import catchAsync from '../utils/catchAsync.js';
import { getUserById, updateUserProfile } from '../services/userService.js';

export const getMe = catchAsync(async (req, res) => {
  const user = await getUserById(req.user._id);
  res.json(user);
});

export const updateMe = catchAsync(async (req, res) => {
  const updates = { ...req.body };

  if (req.file) {
    updates.profilePic = `/uploads/${req.file.filename}`;
  }

  const updated = await updateUserProfile(req.user._id, updates);
  res.json(updated);
});

export const getUser = catchAsync(async (req, res) => {
  const user = await getUserById(req.params.id);
  res.json(user);
});
