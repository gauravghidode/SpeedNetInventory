import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerFName:{
        type: String,
        required: true
    },
    customerLName:{
        type: String,
    },
    role:{
        type: String,
        enum:['customer','dealer'],
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    address:{
        type: {
            street:{
                type: String,
                required: true
            },
            city:{
                type: String,
                required: true
            },
            country:{
                type: String,
                required: true
            },
            zip:{
                type: String,
                required: true
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;