import mongoose, { Schema } from 'mongoose';

const PaymentSchema = new Schema(
    {
        cardId: { type: String, require: true },
        fullName: { type: String, require: true },
        nameCard: { type: String, require: true },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('payment', PaymentSchema);
