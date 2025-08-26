import mongoose from 'mongoose';
import {DB_Name } from '../constants.js';

const connectDB=async ()=>
{
    try{
        const connectionInstances=await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`)
        console.log("MongoDB connected!! DB Host:",connectionInstances.connection.host);
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;
