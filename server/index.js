import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import cardRoutes from './routes/cardRoutes.js'
import phoneNoRoutes from './routes/phoneNoRoutes.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL)
    .then(console.log("connected to mongodb"))
    .catch((e)=>console.log(e));

const app = express();
app.use(express.json());
app.use(cors({credentials: true, origin: process.env.ORIGIN_URL}));
app.use(cookieParser());

app.listen(process.env.PORT||4000, ()=>{
    console.log(`server running on port ${process.env.PORT}`);
});

app.get('/', (req, res)=>{
    res.json({
        message: "API is working",
    })
})

app.use('/v1/user', userRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/customer', customerRoutes);
app.use('/v1/account', accountRoutes);
app.use('/v1/card', cardRoutes);
app.use('/v1/phoneNo', phoneNoRoutes);