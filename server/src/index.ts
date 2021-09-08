import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';

import { connectDB } from './core/db';


dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log("Server started on port: " + PORT));
    } catch (error) {
        console.log(error);        
    }
};

start();