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

export const updateProfileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Provide a valid email'),
  body('phone').optional().isString(),
  body('branch').optional().isString(),
  body('college').optional().isString(),
  body('course').optional().isString(),
  body('enrolmentNumber').optional().isString(),
  body('socialLinks').optional().custom(parseSocialLinks)
];
