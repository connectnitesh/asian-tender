const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { loginValidator } = require('../utility/validator');

//auth-routes
router.post('/login', loginValidator, authController.login);
router.post('/signup', authController.signup);
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
