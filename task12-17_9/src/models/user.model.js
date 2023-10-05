import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
    {
        userName: { type: String, require: true, unique: true },
        payment: { type: Schema.ObjectId, ref: 'payment', default: null },
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        fullName: { type: String, require: true },
        point: { type: Number, require: true },
        role: { type: String, require: true, default: 'user' },
        isLock: { type: Boolean, require: true, default: 0 },
    },
    {
        timestamps: true,
    },
);

UserSchema.pre('save', function (next) {
    const user = this;
    // chỉ mã hóa mật khẩu nếu nó đã được thay đổi hoặc là một tài khoản mới
    if (!user.isModified('password')) return next();
    // sử dụng bcrypt để mã hóa mật khẩu
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // lưu giá trị băm mật khẩu vào trường password
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.isCheckPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {}
};

UserSchema.plugin(mongoosePaginate);

export default mongoose.model('user', UserSchema);
