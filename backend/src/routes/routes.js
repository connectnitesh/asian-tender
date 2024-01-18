const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginValidator,signupValidator } = require('../utility/reqValidator');

//auth-routes
router.post('/login', loginValidator, authController.login);
router.post('/signup', signupValidator, authController.signup);
router.post('/passwordReset', authController.passwordReset);

//tenders-routes
// searchTender
// filterTender
// tenderDetails

// //admin-routes
// listTender
// addTender
// deleteTender

// //subscription
// subscribe
// listSubscribedUsers

module.exports = router;
