import User from '../models/user.model.js';
import client from '../databases/redis.init.js';
import { signAccessToken, signOtpToken, signRefreshToken } from '../services/jwt.service.js';
import transporter from '../services/nodemailer.service.js';
import { verifyRefreshToken } from '../middlewares/auth.middleware.js';
import { Types } from 'mongoose';
import { searchAsync } from './elasticsearch.service.js';

export const create = async (user) => {
    try {
        const { userName, email } = user;
        const userUN = await User.findOne({ userName });
        const userEmail = await User.findOne({ email });

        if (userUN) {
            throw new Error('Username is already exists');
        }
        if (userEmail) {
            throw new Error('Email is already exists');
        }

        const userRegister = new User(user);
        await userRegister.save();
    } catch (error) {
        console.log(error);
        throw new Error('Cannot create user service');
    }
};

export const login = async (userName, password) => {
    try {
        const user = await User.findOne({ userName });
        if (!user) {
            throw new Error('User not found');
        }
        if (user.isLock == 1 || user.isLock == true) {
            throw new Error('The user is locked');
        }
        const isValidPass = await user.isCheckPassword(password);
        if (!isValidPass) {
            throw new Error('Password is not valid');
        }
        const accessToken = await signAccessToken(user._id);
        const refreshToken = await signRefreshToken(user._id);

        await client.set(user._id.toString(), refreshToken, {
            EX: 3600 * 24 * 7,
        });
        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        console.log(error);
        throw new Error('Login failed service');
    }
};

export const changePassword = async (_id, oldPassword, newPassword) => {
    try {
        const user = await User.findById(_id);
        const isValidPass = await user.isCheckPassword(oldPassword);
        if (!isValidPass) {
            throw new Error('Old password is not valid');
        }
        user.password = newPassword;
        await user.save();
    } catch (error) {
        console.log(error);
        throw new Error('Cannot change password service');
    }
};

export const forgotPassword = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('The email is not registerd');
        }
        const otpToken = await signOtpToken(email);
        const min = 100000; // Giá trị nhỏ nhất có 6 chữ số
        const max = 999999; // Giá trị lớn nhất có 6 chữ số
        const otp = Math.floor(Math.random() * (max - min + 1)) + min;
        await client.set(email.toString().concat('_otp'), otp, {
            EX: 60 * 5,
        });
        await transporter.sendMail({
            from: '"Minh Đại 👻" <louistart0ggy@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `OPT lấy lại mật khẩu cho ${email}`, // Subject line
            text: 'Hello world?', // plain text body
            html: `<b>Mã otp của bạn là: ${otp}</b>
                <br>
                <i>otp chỉ có hiệu lực trong 5 phút</i>
                `, // html body
        });
        return otpToken;
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use forgot password service');
    }
};

export const recoveryPassword = async (email, otp, newPassword) => {
    try {
        const otpEmail = parseInt(await client.get(email.concat('_otp').toString()));
        if (!otpEmail) {
            throw new Error('OTP expired');
        }
        if (otp != otpEmail) {
            throw new Error('Invalid OTP');
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User is not found');
        }
        user.password = newPassword;
        await user.save();
        await client.del(email.concat('_otp').toString());
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use recovery password service');
    }
};

export const findById = async (_id) => {
    try {
        const user = await User.findById(_id);
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use findById user service');
    }
};

export const update = async (_id, field) => {
    try {
        if (!Types.ObjectId.isValid(_id)) {
            throw new Error('Invalid id format');
        }

        if (field.userName || field.email || field.role) {
            throw new Error('Can not change this field');
        }
        await User.findByIdAndUpdate(_id, field);
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use update user service');
    }
};

export const refreshToken = async (refToken) => {
    try {
        if (!refToken) {
            throw new Error('Token not found');
        }
        const { _id } = await verifyRefreshToken(refToken);
        const accessToken = await signAccessToken(_id);
        const newRefreshToken = await signRefreshToken(_id);
        return {
            accessToken,
            refreshToken: newRefreshToken,
        };
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use refresh token user service');
    }
};

export const deleteRefreshToken = async (_id) => {
    try {
        const refreshToken = await client.get(_id.toString());
        if (!refreshToken) {
            throw Error('Token not found');
        }
        // const { _id } = await verifyRefreshToken(refreshToken);
        await client.del(_id.toString());
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use delete refresh token service');
    }
};
export const elasticSearch = async (query) => {
    try {
        const users = await User.find();
        return await searchAsync('user', query, users);
    } catch (error) {
        throw error;
    }
};
export const getAll = async (queryParams) => {
    try {
        const { search = null, page = 1 } = queryParams;
        const limit = 5;
        const query = { role: 'user' };

        if (search) {
            query.$or = [
                { userName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { fullName: { $regex: search, $options: 'i' } },
            ];
        }
        const options = {
            limit,
            page,
            select: {
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
                password: 0,
            },
        };
        const users = await User.paginate(query, options);

        // const users = await User.find({ role: 'user' });
        if (!users) {
            throw new Error('User not found');
        }
        return users;
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use get all user service');
    }
};

export const lock = async (userId) => {
    try {
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userId format');
        }
        const user = await User.findOne({ role: 'user', _id: userId });
        if (!user) {
            throw new Error('Users is not found');
        }
        user.isLock = 1; // Lock user
        await user.save();
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use lock user service');
    }
};

export const refreshPassword = async (userId) => {
    try {
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid userId format');
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User is not found');
        }
        if (user.role == 'admin') {
            throw new Error('Cannot refresh password for this user');
        }
        const min = 100000; // Giá trị nhỏ nhất có 6 chữ số
        const max = 999999; // Giá trị lớn nhất có 6 chữ số
        const password = Math.floor(Math.random() * (max - min + 1)) + min;
        user.password = password;
        await user.save();
        await transporter.sendMail({
            from: '"Minh Đại 👻" <louistart0ggy@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: `Cấp lại mật khẩu mới cho ${user.email}`, // Subject line
            text: 'Hello world?', // plain text body
            html: `<b>Password mới của bạn là: ${password}</b>
                <br>
                `, // html body
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use refresh password user service');
    }
};
export const destroy = async (_id) => {
    try {
        if (!Types.ObjectId.isValid(_id)) {
            throw new Error('Invalid userId format');
        }
        const user = await User.findById(_id);
        if (!user) {
            throw new Error('User is not found');
        }
        await User.findByIdAndDelete(_id);
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use destroy user service');
    }
};
