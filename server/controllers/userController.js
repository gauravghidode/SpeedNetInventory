import bcrypt from 'bcrypt';
import User from '../models/userModel.js';

export const updateUser = async (req, res, next) => {
    try {
        console.log(req.body);
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const verify = await User.findOne({email: req.body.email});
        console.log(verify);
        if(verify && verify?._id != req.params.id){
            res.status(200).json({success: false, message: "Email already exists"});
            return;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    contact: req.body.contact,
                    role: req.body.role,
                    customerEditAndSwap: req.body.customerEditAndSwap,
                    customerSwap: req.body.customerSwap,
                    vendorfileAdd: req.body.vendorfileAdd,
                    inventorySwap: req.body.inventorySwap,
                }
            }, { new: true });
        const { password, ...rest } = updatedUser;
        res.status(200).json({success: true, message: "Profile updated successfully", rest});
    } catch (e) {
        res.status(500).json({ message: e.message });
        console.log(e.message);
    }
}


export const getAllUsers = async(req, res) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}

export const getUserById = async(req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({message: e.message});
    }
}