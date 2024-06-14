import Order from '../models/order.js'

export const createOrder = async(req, res)=>{
    try{
        const {phoneNo, price, date} = req.body;
        const order = new Order({phoneNo, date, price});
        await order.save();
        res.status(201).json({message: "Order created successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export const getAllOrders = async(req, res)=>{
    try{
        const orders = await Order.find().populate({
            path: 'phoneNo',
            model: 'PhoneNo',
            populate: {
                path: 'newICCID',
            },
            populate: {
                path: 'newAccount',
                populate: {
                    path: 'customer',
                    model: 'Customer',
                }
            }
        });
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}