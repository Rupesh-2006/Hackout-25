import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || 'http://localhost:8000',
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());



//import routes

import userRouter from "./routes/user.routes.js"


//routes declaration
app.use("/api/v1/users",userRouter)
 

export default app;