import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectMongoose = () => {
    try {
        mongoose.connect(process.env.MONGOOSE_URI);
        console.log('Connect to mongoose successfully');
    } catch (error) {
        console.log('Connect to mongoose failure');
        console.log(error);
    }
};

export default connectMongoose;
