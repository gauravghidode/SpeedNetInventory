import mongoose from "mongoose";

//iccid
const cardSchema = new mongoose.Schema({
    ICCID:{
        type: String,
        required: true,
        unique: true,
    },
    status:{
        type: String,
        required: true,
        default: 'available',
        enum: ['available', 'in-use']
    }
});

const Card = mongoose.model('Card', cardSchema);
export default Card;