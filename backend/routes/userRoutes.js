import express from 'express';
import protect from '../middleware/authMiddleware.js';
import upload from '../utils/upload.js';
import validateRequest from '../middleware/validateRequest.js';
import { updateProfileValidation } from '../validators/userValidators.js';
import { getMe, updateMe, getUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/me', protect, getMe);
router.put('/me', protect, upload.single('profilePic'), updateProfileValidation, validateRequest, updateMe);
router.get('/:id', protect, getUser);

export default router;
