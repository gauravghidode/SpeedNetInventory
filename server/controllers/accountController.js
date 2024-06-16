import Account from "../models/account.js";
import PhoneNo from "../models/phoneNo.js";

export const createAccount = async(req, res) =>{
    try{
        const {invoiceDate, activationDate, recurringStatus} = req.body;
        const accountNo = (await Account.find().sort({accountNo:-1}).limit(1)).at(0)?.accountNo+1 || 100000;
        
        console.log(accountNo);
        const newAccount = new Account({invoiceDate, activationDate, accountNo, recurringStatus,
            customerFName: req.body.customerFName,
            email: req.body.email,
            contact: req.body.contact,
            address: {
                street: req.body.street,
                city: req.body.city,
                country: req.body.country,
                zip: req.body.zip,
            },
            role:req.body.role
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
    const {accountNo, customerFName, email} = req.query;
    var query = {role: 'customer'};
    console.log(req.query);
    if(accountNo && accountNo!==""){
        query = {role: 'customer', accountNo};
    }
    if(customerFName && customerFName!==""){
        query = {role: 'customer', 
            customerFName:{
            $regex: customerFName, 
            $options: "i", //lowercase
        }};
    }
    if(email && email!==""){
        query = {role: 'customer', email};
    }
    try{
        const accounts = await Account.find(query).populate({path: 'phoneNo', populate:{path:'vendor'}});
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