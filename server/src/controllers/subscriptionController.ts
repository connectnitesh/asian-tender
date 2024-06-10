import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { subscriptionPlans } from '../config';
import { stripe } from '../utility/payment';

export const subscribeUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { amount, userId , duration, token } = req.body;
        const userIdAsNumber = parseInt(userId, 10);
        const durationAsNumber = parseInt(duration,10);


        const plan = subscriptionPlans.all;
        if (!plan) {
            return res.status(400).json({ message: 'Invalid subscription pack' });
        }

        if (!plan.duration.includes(durationAsNumber)) {
            return res.status(400).json({ message: 'Invalid subscription duration' });
        }

        const user = await User.findOne({ userId: userIdAsNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
              token: token.id
            }
          });
          
          const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method: paymentMethod.id,
            confirm: true,
            description: 'Subscription payment',
            return_url: 'http://localhost:3000/'
          });
        if (paymentIntent && paymentIntent.client_secret) {
            return res.json({ clientSecret: paymentIntent.client_secret });
        } else {
            return res.status(500).json({ message: 'Failed to create payment intent' });
        }

    } catch (error) {
        next(error);
    }
};


export const updateSubscriptionDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, clientSecret, duration } = req.body;

        const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret);
        if (!paymentIntent || paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: 'Payment failed or not completed' });
        }

        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.subscribedStatus = true;
        user.subscriptionPackCode = 'all';
        user.subscriptionExpiryDate = new Date(new Date().setMonth(new Date().getMonth() + duration));
        user.subscriptionProduct = getProductsForPack();
        await user.save();

        return res.json({ message: 'Subscription details updated successfully', user });
    } catch (error) {
        console.error('Error in updateSubscriptionDetails:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getProductsForPack = (): string[] => {
    return [
        "AC",
        "AI",
        "BHE",
        "BRB",
        "BRC",
        "BCO",
        "CW",
        "CON",
        "DRO",
        "FF",
        "FRI",
        "GDT",
        "GIS",
        "HW",
        "HKS",
        "LI",
        "LEE",
        "MPS",
        "ME",
        "MRW",
        "MIS",
        "PST",
        "SEQ",
        "SEC",
        "SW",
        "SP",
        "TD"
    ];
};

