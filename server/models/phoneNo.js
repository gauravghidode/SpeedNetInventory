import mongoose from "mongoose";

//inventory + vendor page
const phoneNoSchema = new mongoose.Schema({
    phoneNo:{
        type: String,
        required: true,
        unique: true,
    },
    newAccount:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    vendor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
        required: true,
    },
    ICCID:{
        type: String,
        unique: true,
        required: true,
    },
    price:{
        type: Number,
    },
    planType:{
        type: String
    },
    date:{
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    lastUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    recurringStatus:{
        type: String,
        enum: ['active', 'inactive', 'hold', 'needSetup'],
        required: true,
        default: 'active'
    },
    accountStatus:{
        type: String,
        required: true,
        default: 'inactive',
        enum: ['inactive', 'active']
    },
    invoiceDay:{
        type: Number,
        required: true,
        default: 1
    },
    tempAccNo:{
        type: Number,
    },
    tempCustomer:{
        type: String,
        default: 'Check'
    }
    
},{timestamps: true});

const PhoneNo = mongoose.model('PhoneNo', phoneNoSchema);
export default PhoneNo;