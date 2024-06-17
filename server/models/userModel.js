import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
    },
    //permissions
    customerEditAndSwap: { type: Boolean, default: false },
    customerSwap: { type: Boolean, default: false },
    vendorfileAdd: { type: Boolean, default: false },
    inventorySwap: { type: Boolean, default: false },

    role: {
        type: String,
        enum: ['admin', 'technician', 'officeStaff'],
        required: true,
        default: 'officeStaff'
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;