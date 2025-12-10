import { body } from 'express-validator';

const parseLocation = (value, { req }) => {
  let parsed = value;
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value);
    } catch (error) {
      throw new Error('Invalid location JSON');
    }
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('location must be an object');
  }

  const { lat, lng, address } = parsed;
  if (typeof lat !== 'number' || typeof lng !== 'number' || typeof address !== 'string') {
    throw new Error('location must include lat (number), lng (number), and address (string)');
  }

  req.body.location = parsed;
  return true;
};

export const createPostValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('location').custom(parseLocation)
];

export const updatePostValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('location').optional().custom(parseLocation)
];
