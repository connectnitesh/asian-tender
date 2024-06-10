import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
    adminId: number;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema: Schema = new Schema({
    adminId: {
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
}, {
    timestamps: true,
});

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
