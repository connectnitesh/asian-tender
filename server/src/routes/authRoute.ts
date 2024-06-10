import express from 'express';
import {
    AdminLogin,
    AdminSignup,
    CustomerLogin,
    CustomerSignup,
    CustomerProfile,
    AdminProfile
} from '../controllers';
import { verifyTokenUser,verifyToken } from '../services/authService';

const router = express.Router();
router.post('/admin/login', AdminLogin);
router.post('/admin/signup', AdminSignup);
router.post('/customer/login', CustomerLogin);
router.post('/customer/signup', CustomerSignup);
router.post('/customer/profile',verifyTokenUser, CustomerProfile);
router.post('/admin/profile',verifyToken, AdminProfile);


export {router as authRoute}
