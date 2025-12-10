import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import AppError from '../utils/AppError.js';

const SALT_ROUNDS = 10;

export const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new AppError('User with this email already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await User.create({
    ...data,
    password: hashedPassword
  });

  const sanitized = user.toObject();
  delete sanitized.password;
  return sanitized;
};

export const authenticateUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new AppError('Invalid credentials', 401);
  }

  const sanitized = user.toObject();
  delete sanitized.password;
  return sanitized;
};
