"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontendUrl = exports.subscriptionPlans = exports.razorPay_KEY_SECRET = exports.razorPay_KEY_ID = exports.razorpayInstance = exports.ADMIN_SIGNUP_SECRET = exports.JWT_SECRET = exports.PORT = exports.APP_SECRET = exports.MONGO_URI = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var razorpay_1 = __importDefault(require("razorpay"));
dotenv_1.default.config();
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/asian-tender';
exports.APP_SECRET = process.env.APP_SECRET || 'not_soSecret888025';
exports.PORT = process.env.PORT || 8000;
exports.JWT_SECRET = process.env.JWT_SECRET || 'myJwtSecret8*m';
exports.ADMIN_SIGNUP_SECRET = process.env.ADMIN_SIGNUP_SECRET || 'hey£Admin@Signup$£OKAY';
exports.razorpayInstance = new razorpay_1.default({
    key_id: process.env.razorPay_KEY_ID || 'rzp_test_bPd5gNeyvz7OUh',
    key_secret: process.env.razorPay_KEY_SECRET || 'dXrpr8ejwmI0QuxOPQdCWwJ4',
});
exports.razorPay_KEY_ID = process.env.razorPay_KEY_ID || 'rzp_test_bPd5gNeyvz7OUh';
exports.razorPay_KEY_SECRET = process.env.razorPay_KEY_SECRET || 'dXrpr8ejwmI0QuxOPQdCWwJ4';
exports.subscriptionPlans = {
    all: { duration: [1, 4, 12, 24] },
};
exports.frontendUrl = process.env.frontendURL = 'http://localhost:3000';
//# sourceMappingURL=index.js.map