import mongoose from "mongoose";

const backlogSchema = new mongoose.Schema({
    phoneNo:{
        type: String,
        required: true
    },
    
        initialAccountNo:{Type: string},
        initialCustomerFName:{Type: string},
        initialICCID:{Type:string},
        initialStatus:{Type: string},

        laterAccountNo:{Type: string},
        laterCustomerFName:{Type: string},
        laterICCID:{Type:string},
        laterStatua:{Type:string},

        action:{Type: string},

    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

const User = mongoose.model('Backlog', backlogSchema);
export default BackLog;