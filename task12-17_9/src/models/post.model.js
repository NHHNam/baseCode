import mongoose, { Schema } from 'mongoose';

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

export default mongoose.model('post', PostSchema);
