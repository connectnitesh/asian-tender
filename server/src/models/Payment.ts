import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  order_ref_no: {
    type: Number,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  payment_status:{
    type: Boolean,
    required: true,
  }
});

export const Payment = mongoose.model("Payment", paymentSchema);