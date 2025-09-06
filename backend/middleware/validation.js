const { body } = require('express-validator');

const validateStudent = [
  body('studentId')
    .notEmpty()
    .withMessage('Student ID is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Student ID must be between 3 and 20 characters'),
  
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('dateOfBirth')
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 5 || age > 100) {
        throw new Error('Age must be between 5 and 100 years');
      }
      return true;
    }),
  
  body('address.street')
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('address.city')
    .notEmpty()
    .withMessage('City is required')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('City can only contain letters and spaces'),
  
  body('address.state')
    .notEmpty()
    .withMessage('State is required')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('State can only contain letters and spaces'),
  
  body('address.zipCode')
    .notEmpty()
    .withMessage('Zip code is required')
    .matches(/^\d{5,10}$/)
    .withMessage('Zip code must be between 5 and 10 digits'),
  
  body('marks.english')
    .isInt({ min: 0, max: 100 })
    .withMessage('English marks must be between 0 and 100'),
  
  body('marks.maths')
    .isInt({ min: 0, max: 100 })
    .withMessage('Maths marks must be between 0 and 100'),
  
  body('marks.science')
    .isInt({ min: 0, max: 100 })
    .withMessage('Science marks must be between 0 and 100')
];

module.exports = { validateStudent }; 