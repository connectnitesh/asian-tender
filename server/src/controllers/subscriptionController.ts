import { Request, Response, NextFunction } from 'express'
import { razorPay_KEY_ID, razorpayInstance, } from '../config';
import { generatedSignature } from '../utility/crypto';
import { Payment } from "../models/Payment";
import getLatestId from '../utility/helper';
import User from '../models/User';


export const Checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, amount, pack_duration } = req.body;
        console.log(email, amount, pack_duration);
        var options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: "Asian Tender Receipt"
        };
        let order_ref_no = await getLatestId(Payment, 'order_ref_no');
        order_ref_no++;

        const orders = await razorpayInstance.orders.create(options);
        const newPayment = new Payment({
            email: email,
            order_ref_no: order_ref_no,
            razorpay_order_id: orders.id,
            razorpay_payment_id: null,
            razorpay_signature: null,
            payment_status: false,
            pack_duration: parseInt(pack_duration, 10),
            creation_date: new Date()
        });

        console.log(newPayment);

        await newPayment.save();
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

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const expectedSignature = await generatedSignature(razorpay_order_id, razorpay_payment_id);


        const payment_status = expectedSignature === razorpay_signature;



        const updateData = {
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
            payment_status: payment_status
        }

        const result = await Payment.updateOne(
            { razorpay_order_id },
            { $set: updateData }
        )

        const payment = await Payment.find({ razorpay_order_id: razorpay_order_id });
        console.log(payment);
        const new_time = (payment[0].pack_duration * 24 * 60 * 60 * 1000)
        console.log(new_time);
        const new_time1 = (new Date().getTime());
        console.log(new_time1);
        const add_time = new_time1 + new_time;
        console.log(add_time);
        const resTime = new Date(add_time);
        console.log(resTime);
        const expiry_date = resTime;
        console.log(expiry_date)
        const updateUser = {
            subscribedStatus: payment_status,
            subscriptionExpiryDate: new Date((new Date().getTime()) + (payment[0].pack_duration * 24 * 60 * 60 * 1000))
        }

        console.log(updateUser);

        const email = payment[0].email;
        await User.updateOne(
            { email: email },
            { $set: updateUser }
        )

        console.log(email)

        const logs_ = await User.find();
        console.log(logs_);

        const order_ref_no = payment[0].order_ref_no;
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
        const response = await Payment.findOne({ order_ref_no: parseInt(orderID, 10) });
        if (response) {
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

