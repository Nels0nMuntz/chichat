import mongoose from 'mongoose';

export const connectDB = async () => {
    const { MONGO_CONNECTION_STRING } = process.env;
    try {
        const db = mongoose.connection;
        db.on("open", () => console.log("Successfully connected to MongoDB"));
        db.on("error", () => console.log("Connection to MongoDB faild"));
        await mongoose.connect(MONGO_CONNECTION_STRING);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};