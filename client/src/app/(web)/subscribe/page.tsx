"use client"

import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { asyncCheckout, getrazorPayKey, paymentVerify } from '@/api/api'
import Script from 'next/script';
import { useAuth } from "@/context/authContext";

const SubscribePage = () => {

  const { user } = useAuth();

  const checkoutHandler = async (amount: number) => {
    try {

      if(!user ){
        return alert('Please login!')
      }

      if(user && user.subscribed)
        return alert('Already Subscribed')

      const rzp_key = await getrazorPayKey();
      // console.log(rzp_key.key)
      const resp = await asyncCheckout(amount);


    var options = {
      key: rzp_key.key,
      amount: Number(amount * 100),
      currency: "INR",
      name: "Asian Tender",
      description: "Asian Tender Subscription",
      image: "/images/logo2.png",
      order_id: resp.orders.id,
      callback_url: "http://localhost:8000/subscribe/paymentVerification",
      prefill: {
        "name": user.name,
        "email": user.email,
        "contact": user.contact
      },
      notes: {
        "address": "New Delhi"
      },
      theme: {
        "color": "#0062ff"
      }
    };

    //@ts-ignore
    const razorPay = new window.Razorpay(options);
    razorPay.open();

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
   />
    <div className="min-h-max p-4 bg-gray-100">
      <Breadcrumb mainPage="Home" sidePage="Subscribe" mainLink="/" sideLink="subscribe" position="left" />
      <div className="grid grid-cols-3 gap-8 mx-auto max-w-4xl mt-8">
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-600 bg-blue-100 p-2 rounded">1 Month Plan</h2>
          <div className="flex flex-col gap-2">
            <p>Price: Rs. 3,500/- (Three thousand, five hundred only)</p>
            <p>Includes: All Products</p>

            <p>Daily email tender notification</p>
            <p>Download tender document</p>
            <p>Web access</p>
            <button onClick={() => checkoutHandler(3500)}>Subscribe Now</button>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-600 bg-blue-100 p-2 rounded">4 Month Plan </h2>
          <div className="flex flex-col gap-2">
            <p>Price: Rs. 5,500/- (Five thousand, five hundred only)</p>
            <p>Includes: All Products</p>

            <p>Daily email tender notification</p>
            <p>Download tender document</p>
            <p>Web access</p>
            <button onClick={() => checkoutHandler(5500)}>Subscribe Now</button>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-600 bg-blue-100 p-2 rounded">12 Month Plan (Most Popular)</h2>
          <div className="flex flex-col gap-2">
            <p>Price: Rs. 12,500/- (Twelve thousand, five hundred only)</p>
            <p>Includes: All Products</p>

            <p>Daily email tender notification</p>
            <p>Download tender document</p>
            <p>Web access</p>
            <button onClick={() => checkoutHandler(12500)}>Subscribe Now</button>

          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SubscribePage;
