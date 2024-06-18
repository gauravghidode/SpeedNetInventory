import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    phoneNo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhoneNo',
    },

    connnectionCount:{
        type: Number,
        default: 0
    },

    accountNo:{
        type: String,
        unique: true,
        required: true
    },
    
    customerFName:{
        type: String,
        required: true
    },

    role:{
        type: String,
        enum:['customer','dealer'],
        required: true,
        default: 'customer'
    },
    contact:{
        type: Number
    },
    address:{
        type: {
            street:{
                type: String,
                
            },
            city:{
                type: String,
                
            },
            country:{
                type: String,
                
            },
            zip:{
                type: String,
                
            }
        }
    },
    email: {
        type: String,
    },
}, {timestamps: true});

const Account = mongoose.model('Account', accountSchema);
export default Account;