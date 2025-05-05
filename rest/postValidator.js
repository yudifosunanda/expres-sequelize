const { body, param } = require('express-validator');

const addPostValidationRules = () => [
  body('usr_id').isInt().notEmpty().withMessage('User relation is required'),
  body('post').notEmpty().withMessage('Post is required'),
];

const updatePostValidationRules = () => [
  param('usr_id').isInt().withMessage('ID must be an integer'),
  body('post').optional().notEmpty().withMessage('Post cannot be empty'),
];

module.exports = {
  addPostValidationRules,
  updatePostValidationRules
};
