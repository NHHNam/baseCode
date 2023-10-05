import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const PostSchema = new Schema(
    {
        title: { type: String, require: true },
        description: { type: String },
        userId: { type: Schema.ObjectId, require: true, ref: 'user' },
        thumnail: { type: String },
    },
    {
        timestamps: true,
    },
);

PostSchema.plugin(mongoosePaginate);

export default mongoose.model('post', PostSchema);
