import catchAsync from '../utils/catchAsync.js';
import generateToken from '../utils/generateToken.js';
import { registerUser, authenticateUser } from '../services/authService.js';

export const register = catchAsync(async (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    branch: req.body.branch,
    college: req.body.college,
    course: req.body.course,
    enrolmentNumber: req.body.enrolmentNumber,
    profilePic: req.body.profilePic,
    socialLinks: req.body.socialLinks
  };

  if (req.file) {
    userData.profilePic = `/uploads/${req.file.filename}`;
  }

  const user = await registerUser(userData);
  const token = generateToken(user._id);

  res.status(201).json({
    token,
    user
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authenticateUser({ email, password });
  const token = generateToken(user._id);

  res.json({
    token,
    user
  });
});
