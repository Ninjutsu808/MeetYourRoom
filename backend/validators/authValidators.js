import { body } from 'express-validator';

const parseSocialLinks = (value, { req }) => {
  if (value === undefined || value === null || value === '') {
    req.body.socialLinks = undefined;
    return true;
  }

  let parsed = value;
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value);
    } catch (error) {
      throw new Error('Invalid socialLinks JSON');
    }
  }

  if (typeof parsed !== 'object') {
    throw new Error('socialLinks must be an object');
  }

  req.body.socialLinks = parsed;
  return true;
};

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isString(),
  body('branch').optional().isString(),
  body('college').optional().isString(),
  body('course').optional().isString(),
  body('enrolmentNumber').optional().isString(),
  body('socialLinks').optional().custom(parseSocialLinks)
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];
