import dotenv from 'dotenv';
import Razorpay from 'razorpay'

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/asian-tender';
export const APP_SECRET = process.env.APP_SECRET || 'not_soSecret888025';
export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || 'myJwtSecret8*m'
export const ADMIN_SIGNUP_SECRET = process.env.ADMIN_SIGNUP_SECRET || 'hey£Admin@Signup$£OKAY'

export const razorpayInstance = new Razorpay({
    key_id: process.env.razorPay_KEY_ID || 'rzp_test_bPd5gNeyvz7OUh', 
    key_secret: process.env.razorPay_KEY_SECRET || 'dXrpr8ejwmI0QuxOPQdCWwJ4',
  });

export const razorPay_KEY_ID = process.env.razorPay_KEY_ID || 'rzp_test_bPd5gNeyvz7OUh';
export const razorPay_KEY_SECRET = process.env.razorPay_KEY_SECRET || 'dXrpr8ejwmI0QuxOPQdCWwJ4';

export const subscriptionPlans = {
    all: { duration: [1, 4, 12, 24] },
};


export const frontendUrl = process.env.frontendURL = 'http://localhost:3000'

