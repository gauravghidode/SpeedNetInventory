import Account from "../models/account.js";
import PhoneNo from "../models/phoneNo.js";

export const createAccount = async(req, res) =>{
    try{
        const {invoiceDate, activationDate, recurringStatus, accountNo, customerFName} = req.body;
        if(accountNo === undefined || customerFName === undefined){
            return res.status(200).json({success: false, message: "Please Fill all the fields again"});
        }
        const verify = await Account.findOne({accountNo: accountNo});
        if(verify) {
            return res.status(200).json({success: false, message:"Account number already exists"});
        }
        
        const newAccount = new Account({invoiceDate, activationDate, recurringStatus,
            customerFName,
            email: req.body.email,
            contact: req.body.contact,
            address: {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                zip: req.body.zip,
            },
            role:req.body.role,
            accountNo: accountNo
        });
        await newAccount.save();
        res.status(201).json({success: true, message: 'Account created Successfully', newAccount: newAccount});
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}


export const getAllAccounts = async(req, res) =>{
    try{
        const accounts = await Account.find().populate({
            path:'phoneNo',
        }).populate({
            path:'phoneNo.vendor',
        });
        res.status(200).json(accounts);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}

export const getAccountsOnly = async(req, res) =>{
    try{
        const accounts = await Account.find()
        res.status(200).json(accounts);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}


//get all phone connections for account page
export const getAccountById = async(req, res) =>{
    try{
        // const account = await Account.findById(req.params.id).populate(
        const account = await Account.findById(req.params.id).populate({
            path:'phoneNo',
        }).populate({
            path:'phoneNo.vendor',
        });

        const connections = await PhoneNo.find({newAccount:req.params.id, accountStatus: 'active'}).populate({
            path:'vendor',
        });
        res.status(200).json({account, connections});
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}


export const getDealerAccounts = async (req, res) => {
    try{
        const accounts = await Account.find({role: "dealer"});
        res.status(200).json(accounts);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}


export const getCustomerAccounts = async (req, res) => {
    const {keyword, page, pageSize} = req.query;
    console.log(req.query);
    const skip = pageSize * (page - 1);
    
    const query = {role: 'customer', 
        $or:[
        {
        customerFName:{
            $regex: keyword, 
            $options: "i", //lowercase
        }},
        {email:{
            $regex: keyword, 
            $options: "i", //lowercase
        }},
        {accountNo: {
            $regex: keyword, 
            $options: "i", //lowercase
        }} 
        ]    
    };
    
    try{
        const accounts = await Account.find(query).limit(pageSize).skip(skip).populate({path: 'phoneNo', populate:{path:'vendor'}});
        res.status(200).json(accounts);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}

export const updateAccount = async(req, res) =>{
    try{
        const {customerFName, email, contact, street, city, zip, role, country} = req.body;
        console.log(req.body);
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, {customerFName, email, contact, address:{street, city, country, zip}, role}, {new: true}).populate(
            {
                path: 'phoneNo',
                populate: {path: 'vendor'}
            }
        );
        res.status(200).json(updatedAccount);
    }
    catch(e){
        console.log(e.message);
        res.status(500).json({message: e.message});
    }
}


export const checkAccount = async(req, res)=>{
    try{
        const account = await Account.findOne({accountNo: req.params.newAccountNo});
        if(!account){
            res.status(404).error({message: "Account not found"});
            return;
        }

        res.status(200).json(account);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}

export const searchAccounts = async(req, res)=>{
    try{
        const account = await Account.find({customerFName:{ $regex: req.params.customerFName, $options: "i"}}, {customerFName: true, accountNo: true}).limit(10);
        if(!account){
            res.status(404).error({message: "Account not found"});
            return;
        }
        res.status(200).json(account);
    }catch(e){
        res.status(500).json({message: e.message});
    }
}