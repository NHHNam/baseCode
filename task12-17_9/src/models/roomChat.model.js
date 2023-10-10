import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const RoomChatSchema = new Schema(
    {
        name: { type: String },
    },
    {
        timestamps: true,
    },
);
RoomChatSchema.plugin(mongoosePaginate);
// PaymentSchema.plugin(aggregatePaginate);

export default mongoose.model('roomChat', RoomChatSchema);
