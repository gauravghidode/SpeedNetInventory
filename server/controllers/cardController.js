import Vendor from "../models/vendor.js";
import Card from "../models/card.js";

export const addVendor = async(req, res, next) => {
    try{
        const {vendorName} = req.body;
        const newVendor = Vendor({vendorName: vendorName});
        await newVendor.save();
        res.status(201).json({message: "Vendor added successfully"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export const getVendors = async(req, res)=>{
    try{
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export const addCard = async(req, res)=>{
    try{
        const {ICCID, vendor} = req.body;
        const verify = await Card.findOne({ICCID:ICCID});
        if(verify){
            res.status(400).json({message: "ICCID Card already exists"});
            return;
        }
        const newCard = Card({ICCID:ICCID, vendor});
        await newCard.save();
        res.status(201).json({message: "Card added successfully"});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export const getCardsByVendor = async(req, res)=>{
    try{
        const cards = await Card.find({vendor: req.params.vendor});
        res.status(200).json(cards);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}