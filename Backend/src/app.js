import express from 'express';
import cors from 'cors';
import cookierParser from 'cookie-parser';

const app=express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookierParser());

export default app;