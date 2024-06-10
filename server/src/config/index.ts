import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/asian-tender';
export const APP_SECRET = process.env.APP_SECRET || 'not_soSecret888025';
export const PORT = process.env.PORT || 8000;
export const JWT_SECRET = process.env.JWT_SECRET || 'myJwtSecret8*m'
export const ADMIN_SIGNUP_SECRET = process.env.ADMIN_SIGNUP_SECRET || 'hey£Admin@Signup$£OKAY'

export const stateData = require('./state.json');
export  const categoryData = require('./categories.json');

export const subscriptionPlans = {
    all: { duration: [1, 4, 12, 24] },
};

