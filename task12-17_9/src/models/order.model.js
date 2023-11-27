import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
    {
        userId: { type: String, require: true, ref: 'user' },
        products: { type: Array, default: [] },
        total: Number,
        status: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('order', OrderSchema);
