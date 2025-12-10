import express from 'express';
import protect from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import upload from '../utils/upload.js';
import {
  createListingValidation,
  listingIdParam
} from '../validators/listingValidators.js';
import {
  create,
  list,
  detail,
  listByUser,
  remove
} from '../controllers/listingController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, list)
  .post(protect, upload.array('photos', 6), createListingValidation, validateRequest, create);

router.get('/user/:userId', protect, listByUser);

router
  .route('/:id')
  .get(protect, listingIdParam, validateRequest, detail)
  .delete(protect, listingIdParam, validateRequest, remove);

export default router;
