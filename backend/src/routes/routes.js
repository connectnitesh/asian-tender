const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');
const tenderController = require('../controllers/tenderController');
const subscriptionController = require('../controllers/subscriptionController');

//user-auth-routes
router.post('/login', authController.login);
router.post('/signup', authController.signup);

//tenders-routes
router.get('/search', tenderController.search)
router.post('/filter', tenderController.filterSearch)
router.post('/tender-details', tenderController.tenderDetails)

//admin-auth-routes
router.post('/admin-login', adminController.adminLogin);
router.post('/admin-signup', adminController.adminSignup);

//adming-panel-routes
router.get('/list-tender/:tID', adminController.listTender);
router.post('/add-tender', adminController.addTender);
router.delete('/delete-tender/:tID', adminController.deleteTender);

//subscription
router.post('/subscribe', subscriptionController.subscribe);
router.get('/list-subscriber', subscriptionController.listSubscriber);

//seeding-tender
router.post('/seed-tender', tenderController.seed);

module.exports = router;
