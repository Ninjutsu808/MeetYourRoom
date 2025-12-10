import { param } from 'express-validator';

export const postIdValidation = [param('postId').isMongoId().withMessage('Invalid post id')];
