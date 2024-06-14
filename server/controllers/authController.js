import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

export const register = async(req, res)=>{
    try{
        // console.log(req.body);
        const {username, email, password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({username, email, password:hashedPassword});
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}

export const login = async(req, res)=>{
    try{
        console.log(req.body);
        const {email, password} = req.body;
        const validUser = await User.findOne({email});
        if(!validUser){
            res.status(401).json({message: "Invalid credentials"});
        }
        const validPassword = await bcryptjs.compare(password, validUser.password);
        if(!validPassword){
            res.status(401).json({message: "Invalid credentials"});
        }
        const {password: hashedPassword, ...rest} = validUser._doc;
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const expiry = new Date(Date.now()+ 24*60*60*1000);
        res.cookie('token', token, {httpOnly: true, expires: expiry}).status(200).json(rest);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}

export const logout = async(req, res, next)=>{
    res.clearCookie('token').status(200).json({message: "Logged out successfully"});
}