import { body } from 'express-validator';

export const registerValidator = [
    body('email', 'Email is incorrect').isEmail(),
    body('password', 'Password is incorrect').isLength({ min: 5 }),
    body('fullName', 'FullName is incorrect').isLength({ min: 3 }),
    body('avatarUrl', 'Avatar URL is incorrect').optional().isURL(),
];

export const loginValidator = [
    body('email', 'Email is incorrect').isEmail(),
    body('password', 'Password is incorrect').isLength({ min: 5 }),
];

export const postCreateValidator = [
    body('title', 'Write a title of this post').isLength({ min: 3 }).isString(),
    body('text', 'Write a text of this post').isLength({ min: 3 }).isString(),
    body('tags', 'The format of tags is incorrect').optional().isArray(),
    body('imageUrl', 'Image URL is incorrect').optional().isString(),
];
