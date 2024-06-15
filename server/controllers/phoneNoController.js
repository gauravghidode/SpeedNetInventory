import PhoneNo from '../models/phoneNo.js';
import Card from '../models/card.js';
import Account from '../models/account.js';

export const addPhoneNo = async(req, res) =>{
    try{
        console.log(req.body);
        const {phoneNo, price, vendor, ICCID, planType, date, lastUser} = req.body;
        if(phoneNo==undefined || phoneNo=='' || ICCID==undefined || planType==undefined || ICCID=='' || planType==""){
            return res.status(200).json({success: false, message: "Please Fill all the fields again"});
        }
        if(!(/^[a-zA-Z0-9]+$/.test(ICCID) && ICCID.length===20)){
            res.status(200).json({success: false, message: "Invalid ICCID"});
            return;
        }
        const verify = await PhoneNo.findOne({ICCID: ICCID});
        if(verify){
            return res.status(200).json({success: false, message: "ICCID already assigned to other PhoneNo"}) ;
        }
        const verifyPh = await PhoneNo.findOne({phoneNo: phoneNo});
        if(verifyPh){
            return res.status(200).json({success: false, message: "Phone number already present"}) ;
        }
        const newphoneNo = PhoneNo({phoneNo, ICCID, price, vendor, date, planType, lastUser});
        await newphoneNo.save();
        res.status(201).json({success: true, message: "Phone number added successfully"});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
}

//get all unassigned phoneNos for inventory
export const getAllPhoneNo = async(req, res) =>{
    try{
        const phoneNo = await PhoneNo.find({accountStatus: 'inactive'}).populate({
            path: 'newAccount',
        }).populate({
            path: 'vendor',
        }).populate({
            path: 'lastUser',
        });
        res.status(200).json(phoneNo);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

//for vendors
export const getVendorPhoneNo = async(req, res) =>{
    try{
        const vendorId = req.params.vendor;
        // const phoneNo = await PhoneNo.aggregate([{$match:{vendor: vendorId}}])
        const phoneNo = await PhoneNo.find({vendor: vendorId}).populate({
            path:'newAccount',
        });
        res.status(200).json(phoneNo);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
}


//for main file
export const getAllActiveConnections = async(req, res) =>{
    try{
        const phoneNo = await PhoneNo.find({accountStatus: 'active'}).populate({
            path:'newAccount',
        }).populate({
            path:'vendor',
        });
        res.status(200).json(phoneNo);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

export const deactivateConnection = async(req, res) =>{
    try{
        // console.log(req.body);
        await PhoneNo.findByIdAndUpdate(
            req.params.id,
            {
                $set: {accountStatus:'inactive', lastUser: req.body.userId}
            }, { new: true });
        await Account.findByIdAndUpdate(req.body.accId, {$inc:{connnectionCount: -1}});
        res.status(200).json({success: true, message: "Connection deactivated, you can reallocate it from inventory."});
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
}


export const addConnection = async (req, res) => {
    try{
        const {updatedAccountNo, updatedICCID, lastUser} = req.body;
        if(updatedAccountNo === undefined || updatedAccountNo==='' || updatedICCID === undefined || updatedICCID===''){
            res.status(200).json({success: false, message: "Please Fill all the fields again"});
            return;
        }
        if(!(/^[a-zA-Z0-9]+$/.test(updatedICCID) && updatedICCID.length===20)){
            res.status(200).json({success: false, message: "Invalid ICCID"});
            return;
        }
        // console.log(req.body);
        const verify = await PhoneNo.findOne({ICCID: updatedICCID});
        const phoneNo = await PhoneNo.findById(req.params.id);
        if(verify && verify.phoneNo !== phoneNo.phoneNo) {
            res.status(200).json({success: false, message: "ICCID Card already in use"});
            return;
        }
        else{
            const account = await Account.findOne({accountNo: updatedAccountNo});
            if(!account){
                res.status(200).json({success: false, message: "Account not found"});
                return;
            }
            if(account.role==='dealer'){
                await PhoneNo.findByIdAndUpdate(req.params.id, {ICCID: updatedICCID, newAccount: account._id, lastUser: lastUser, accountStatus: 'active'});    
                await Account.findByIdAndUpdate(account._id,{$inc:{connnectionCount: 1}});
                res.status(200).json({success: true, message: "Connection assigned successfully to Dealer"});
            }
            else{
                console.log(account.connnectionCount);
                if(account.connnectionCount===1){
                    const resp = await PhoneNo.updateMany({newAccount: account._id},{accountStatus:'inactive'});
                    console.log(resp);
                    await PhoneNo.findByIdAndUpdate(req.params.id, {ICCID: updatedICCID, newAccount: account._id, lastUser: lastUser, accountStatus:'active'});
                    await Account.findByIdAndUpdate(account._id, {phoneNo: req.params.id});
                }
                else{
                    await PhoneNo.findByIdAndUpdate(req.params.id, {ICCID: updatedICCID, newAccount: account._id, lastUser, accountStatus:'active'});
                    await Account.findByIdAndUpdate(account._id, {phoneNo: req.params.id, connnectionCount: 1});
                }
                res.status(200).json({success:true, message: "Connection assigned successfully to Customer"})
            }
        }
    }catch(e){
        console.log(e.message);
        res.status(500).json({success: false, message:e.message});
    }
}




// export const updatePhoneNo = async(req, res) =>{
//     try{
//         const {updatedAccountNo, updatedICCID} = req.body;
//         const newICCID = await Card.findOne({ICCID: updatedICCID});
//         const newAccount = await Account.findOne({accountNo: updatedAccountNo});
//         await Card.findByIdAndUpdate()
        
//         if(!newICCID){
//             const newCard = Card({ICCID:ICCID, vendor});
//             newICCID = await newCard.save();
//         }
//         if(newAccount && newICCID){
//             const phoneNo = await Phone.find
//             if(newICCID.status==='available'){
//                 await Card.findByIdAndUpdate(newICCID._id,{status:'in-use'});
//                 if(newAccount.role==='dealer'){
//                     const updatedPhoneNo = await PhoneNo.findByIdAndUpdate(
//                         req.params.id,
//                         {
//                             $set: {newAccount:newAccount._id, newICCID:newICCID._id, accountStatus:'active'}
//                         }, { new: true });
//                     console.log(updatedPhoneNo);
//                     const newCount = newAccount.connectionCount+1;
//                     await Account.findByIdAndUpdate(newAccount._id,{connnectionCount:newCount});
//                     res.status(200).json({success: true, message: 'Connection assigned successfully'});
//                 }
//                 else{
//                     if(newAccount.connectionCount==1){
//                         await PhoneNo.findOneAndUpdate({accountStatus: 'active', newAccount: newAccount._id}, {accountStatus: 'inactive'});
//                     }
//                     await Account.findByIdAndUpdate(newAccount._id,{connectionCount:1, PhoneNo: req.params.id});
//                     const updatedPhoneNo = await PhoneNo.findByIdAndUpdate(
//                         req.params.id,
//                         {
//                             $set: {newAccount:newAccount._id, newICCID:newICCID._id, accountStatus:'active'}
//                         }, { new: true });
//                 }
                
//             }
//             else{
//                 res.status(200).json({success: false, message: 'ICCID is not available'});
//             }

            
//             const newPhoneNos = newAccount.phoneNo.concat(req.params.id);
//             // const arr = [...new Set(newPhoneNos)]
//             // await Account.findByIdAndUpdate(newAccount._id, {phoneNo:newPhoneNos}, {new: true});
            
//         }
//         else{
//             console.log("invalid account or iccid");
//             return res.status(201).json({success:false, message: "Invalid account or ICCID"});
//         }
        
//     }
//     catch(err){
//         res.status(500).json({message: err.message});
//         console.log(err.message);
//     }
// }

