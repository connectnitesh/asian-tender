import express from 'express';
import { Checkout, PaymentVerification, getApiKey, verifyOrder } from '../controllers';


const router = express.Router();

router.post('/checkout', Checkout);
router.post('/paymentVerification', PaymentVerification);
router.get('/getapiKey', getApiKey);
router.post('/verifyorder', verifyOrder)

export { router as subscriptionRoute }
