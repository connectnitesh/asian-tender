const  {body} = require('express-validator');

module.exports.loginValidator = [
  body('email', 'Invalid does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

module.exports.signupValidator = [
  body('name', 'Invalid name').not().isEmpty().isString(),
  body('email', 'Invalid email').not().isEmpty().isEmail(),
  body('contact', 'Invalid Contact').not().isEmpty().isNumeric(),
  body('company', 'password does not Empty').not().isEmpty().isString(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]