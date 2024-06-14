import Account from "../models/account.js";
import PhoneNo from "../models/phoneNo.js";

export const createAccount = async(req, res) =>{
    try{
        const {customer, invoiceDate, activationDate, recurringStatus, phoneNo, accountStatus} = req.body;
        const accountNo = (await Account.find().sort({accountNo:-1}).limit(1)).at(0)?.accountNo+1 || 100000;
        
        console.log(accountNo);
        const newAccount = new Account({customer, invoiceDate, activationDate, accountNo, phoneNo, recurringStatus, accountStatus,
            customerLName: req.body.customerLName,
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
        res.status(201).json({message: "Account created successfully"});
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
        const accounts = await Account.find(query).populate({path: 'phoneNo'});
        res.status(200).json(accounts);
    }
    catch(e){
        res.status(500).json({message: e.message});
    }
}



// async function updateAccountandPhone(req, res, phoneNo){

//     const session = await conn.startSession();
//     try {
//         const account = await Account.findOne({_id: req.params.id});
//         var newPhoneNos;
//         if(account.phoneNo ==[] || account.phoneNo == undefined){
//             newPhoneNos = phoneNo;
//         }
//         else{
//             newPhoneNos = account.phoneNo.concat(phoneNo);
//         }
//         const arr = [...new Set(newPhoneNos)]


//         session.startTransaction(); 
        
//         await Account.findByIdAndUpdate(req.params.id, {phoneNo: arr}, {new: true}, {session});
//         await PhoneNo.findByIdAndUpdate(phoneNo[0], {newAccount: req.params.id}, {new: true}, {session});
//         await phoneNo.forEach(async(id)=>await PhoneNo.findByIdAndUpdate(id, {newAccount: req.params.id}, {session}));
        
//         await session.commitTransaction();
        
//         console.log('success');
//     } catch (error) {
//         console.log(error.message);
//         await session.abortTransaction();
//     }
//     session.endSession();
        
// }

export const updateAccount = async(req, res) =>{
    try{
        const {customerFName, email, contact, street, city, zip, role, country} = req.body;
        console.log(req.body);
        
        // if(phoneNo && phoneNo !== ""){
        //     const phoneNo = PhoneNo.findOne({phoneNo: phoneNo, accountStatus: 'inactive'});
        //     if(phoneNo){
        //         await PhoneNo.findByIdAndUpdate(phoneNo._id, {accountStatus: 'active', newAccount:req.params.id});
        //         await Account.findByIdAndUpdate(req.params.id, {phoneNo: phoneNo._id, connnectionCount:})
        //     }
        // }
       
        const updatedAccount = await Account.findByIdAndUpdate(req.params.id, {customerFName, email, contact, address:{street, city, country, zip}, role}, {new: true});
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