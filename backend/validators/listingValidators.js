import { body, param } from 'express-validator';

const roomTypes = ['1RK', '1BHK', 'sharing', 'single'];
const genderPreferences = ['Boys', 'Girls', 'Anyone'];

export const listingIdParam = param('id').isMongoId().withMessage('Invalid listing id');

export const createListingValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('rent').isFloat({ gt: 0 }).withMessage('Rent must be a positive number'),
  body('roomType').isIn(roomTypes).withMessage('Invalid room type'),
  body('genderPreference').optional().isIn(genderPreferences).withMessage('Invalid gender preference'),
  body('latitude').optional({ checkFalsy: true }).isFloat().withMessage('Latitude must be a number'),
  body('longitude').optional({ checkFalsy: true }).isFloat().withMessage('Longitude must be a number'),
  body('amenities').optional()
];

export const updateListingValidation = [
  listingIdParam,
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('address').optional().trim().notEmpty().withMessage('Address cannot be empty'),
  body('rent').optional().isFloat({ gt: 0 }).withMessage('Rent must be a positive number'),
  body('roomType').optional().isIn(roomTypes).withMessage('Invalid room type'),
  body('genderPreference').optional().isIn(genderPreferences).withMessage('Invalid gender preference'),
  body('latitude').optional({ checkFalsy: true }).isFloat().withMessage('Latitude must be a number'),
  body('longitude').optional({ checkFalsy: true }).isFloat().withMessage('Longitude must be a number'),
  body('amenities').optional().isArray().withMessage('Amenities must be an array')
];
