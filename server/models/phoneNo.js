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
    customerFName:{
        type: String,
    },
    accountNo:{
        type: String,
        default:'0'
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
    cplanPrice:{
        type: Number,
        default: 0
    },
    cmodemLease:{
        type: Number,
        default: 0
    },
    cactivationDate:{
        type: Date
    },
    custody:{
        type: String,
        default: 'SpeedNet'
    }
    
},{timestamps: true});

const PhoneNo = mongoose.model('PhoneNo', phoneNoSchema);
export default PhoneNo;