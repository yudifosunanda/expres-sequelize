const { body, param } = require('express-validator');
const path = require('path');

const addUserValidationRules = () => [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('gender').isIn(['1', '2']).withMessage('Gender must be either male or female'),
  body('profilePic').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Profile picture is required');
    }

    console.log(req.file)
    let exstension = path.extname(req.file.originalname).toLowerCase();
    return true;
  })
];

const updateUserValidationRules = () => [
  param('id').isInt().withMessage('ID must be an integer'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Email must be valid'),
  body('gender').optional().isIn(['1', '2']).withMessage('Gender must be either male or female')
];

module.exports = {
  addUserValidationRules,
  updateUserValidationRules
};
