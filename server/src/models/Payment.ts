import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  order_ref_no: {
    type: Number,
    required: true,
    unique: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  payment_status:{
    type: Boolean,
    required: true,
  },
  pack_duration: {
    type: Number,
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
  }
});

export const Payment = mongoose.model("Payment", paymentSchema);