import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const PaymentSchema = new Schema(
    {
        cardId: { type: String, require: true },
        fullName: { type: String, require: true },
        userId: { type: Schema.ObjectId, require: true, ref: 'user' },
        nameCard: { type: String, require: true },
        amount: { type: Number, min: 0, default: 0 },
    },
    {
        timestamps: true,
    },
);
PaymentSchema.plugin(mongoosePaginate);
// PaymentSchema.plugin(aggregatePaginate);

export default mongoose.model('payment', PaymentSchema);
