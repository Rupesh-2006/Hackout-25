import dotenv from 'dotenv';
import connectDB from './db/index.js'
import express from 'express';

const app=express();

dotenv.config({
    path: '../.env'
});
connectDB()
.then(
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
)
.catch((err)=>console.log("database connection failed due to ",err));