import express from 'express';
import upload from '../utils/upload.js';
import validateRequest from '../middleware/validateRequest.js';
import { registerValidation, loginValidation } from '../validators/authValidators.js';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', upload.single('profilePic'), registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);

export default router;
