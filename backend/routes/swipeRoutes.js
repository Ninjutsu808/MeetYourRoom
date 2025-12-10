import express from 'express';
import protect from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { postIdValidation } from '../validators/swipeValidators.js';
import { like, dislike, matches } from '../controllers/swipeController.js';

const router = express.Router();

router.post('/:postId/like', protect, postIdValidation, validateRequest, like);
router.post('/:postId/dislike', protect, postIdValidation, validateRequest, dislike);
router.get('/matches', protect, matches);

export default router;
