import { Request, Response, NextFunction } from 'express'
import { razorPay_KEY_ID, razorpayInstance, } from '../config';
import { generatedSignature } from '../utility/crypto';
import { Payment } from "../models/Payment";
import getLatestId from '../utility/helper';


export const Checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        var options = {
            amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
            currency: "INR",
            receipt: "Asian Tender Receipt"
        };
        const orders = await razorpayInstance.orders.create(options);
        console.log(orders);
        return res.json({
            status: 'success',
            orders
        })
    } catch (error) {
        next(error);
    }
};

export const PaymentVerification = async (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log(req.body);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const expectedSignature = await generatedSignature(razorpay_order_id, razorpay_payment_id);


        const payment_status = expectedSignature === razorpay_signature;

        let order_ref_no = await getLatestId(Payment, 'order_ref_no');
        order_ref_no = Number(order_ref_no++);
        const newPayment = new Payment({ 
            order_ref_no, 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature, 
            payment_status
        });

        await newPayment.save();

        if (payment_status) {
            res.redirect(
                `http://localhost:3000/subscribe/checkout/success?reference=ASNT${order_ref_no}`
            );
        } else {
            res.redirect(
                `http://localhost:3000/subscribe/checkout/failure?reference=ASNT${order_ref_no}`
            );
        }
    } catch (error) {
        next(error);
    }
};

export const getApiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.json({
            key: razorPay_KEY_ID
        })
    } catch (error) {
        next(error);
    }
};

export const verifyOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { order_ref_no } = req.body;
        const orderID = order_ref_no.replace(/ASNT/g, '');
        const response = await Payment.findOne({order_ref_no: parseInt(orderID, 10)});
        if(response){
            return res.json({
                status: 'success',
                message: `Order found with order_ref_no: ${response.order_ref_no}`,
                paymentStatus: (response.payment_status) ? 'success' : 'failure'
            })
        }
        return res.status(404).json({
            status: 'failure',
            message: "Order not found ",
        });
    } catch (error) {
        next(error);
    }
};

