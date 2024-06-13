import dotenv from 'dotenv';
import Razorpay from 'razorpay'

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI ;
export const APP_SECRET = process.env.APP_SECRET ;
export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET 
export const ADMIN_SIGNUP_SECRET = process.env.ADMIN_SIGNUP_SECRET 

export const razorpayInstance = new Razorpay({
    key_id: process.env.razorPay_KEY_ID , 
    key_secret: process.env.razorPay_KEY_SECRET ,
  });

export const razorPay_KEY_ID = process.env.razorPay_KEY_ID ;
export const razorPay_KEY_SECRET = process.env.razorPay_KEY_SECRET ;

export const subscriptionPlans = {
    all: { duration: [1, 4, 12, 24] },
};


