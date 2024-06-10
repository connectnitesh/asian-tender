import mongoose, { Schema, Document } from 'mongoose';

export interface ITender extends Document {
  tID: number; 
  state: string;
  state_code: string;
  category: string;
  category_code: string;
  title: string;
  value: number;
  document?: string; 
  closeDate: Date; 
}

const TenderSchema: Schema = new Schema({
  tID: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  state_code: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  category_code: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  document: {
    type: String,
    required: true,
  },
  closeDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, 
});

const Tender = mongoose.model<ITender>('Tender', TenderSchema);

export default Tender;
