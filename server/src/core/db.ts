import mongoose from 'mongoose';

export const connectDB = async () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
    try {
        const db = mongoose.connection;
        db.on("open", () => console.log("Successfully connected to MongoDB"));
        db.on("error", () => console.log("Connection to MongoDB faild"));
        await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};