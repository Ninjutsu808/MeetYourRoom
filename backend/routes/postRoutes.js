import express from 'express';
import protect from '../middleware/authMiddleware.js';
import upload from '../utils/upload.js';
import validateRequest from '../middleware/validateRequest.js';
import {
  createPostValidation,
  updatePostValidation
} from '../validators/postValidators.js';
import {
  create,
  list,
  detail,
  update,
  remove
} from '../controllers/postController.js';

const router = express.Router();

router.route('/').get(protect, list).post(
  protect,
  upload.array('photos', 5),
  createPostValidation,
  validateRequest,
  create
);

router
  .route('/:id')
  .get(protect, detail)
  .put(protect, upload.array('photos', 5), updatePostValidation, validateRequest, update)
  .delete(protect, remove);

export default router;
