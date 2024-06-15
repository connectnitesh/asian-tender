import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  contact: number;
  email: string;
  company: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: number;
  password: string;
  subscribedStatus: boolean;
  subscriptionPackCode: string;
  subscriptionExpiryDate: Date;
  subscriptionProduct: string[];
  userId: number,
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  pincode: {
    type: Number,
    default: null,
  },
  subscribedStatus: {
    type: Boolean,
    default: false,
  },
  subscriptionPackCode: {
    type: String,
    default: null,
  },
  subscriptionProduct: {
    type: Array<String>,
    default: [],
  },
  subscriptionExpiryDate: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
