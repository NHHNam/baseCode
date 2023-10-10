import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const MessageSchema = new Schema(
    {
        roomId: { type: Schema.ObjectId, require: true, ref: 'roomChat' },
        userId: { type: Schema.ObjectId, require: true, ref: 'user' },
        message: { type: String },
    },
    {
        timestamps: true,
    },
);
MessageSchema.plugin(mongoosePaginate);
// PaymentSchema.plugin(aggregatePaginate);
MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 24 * 7 });
export default mongoose.model('message', MessageSchema);
