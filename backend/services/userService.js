import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const sanitizeUser = (user) => {
  if (!user) return null;
  const sanitized = user.toObject();
  delete sanitized.password;
  return sanitized;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return user;
};

export const updateUserProfile = async (userId, updates) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedUser) {
    throw new AppError('User not found', 404);
  }

  return updatedUser;
};

export const createUser = async (data) => {
  const user = await User.create(data);
  return sanitizeUser(user);
};
