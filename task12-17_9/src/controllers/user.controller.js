import createError from 'http-errors';
import User from '../models/user.model.js';
import Payment from '../models/payment.model.js';
import { signAccessToken, signOtpToken, signRefreshToken } from '../services/jwt.service.js';
import client from '../databases/redis.init.js';
import { verifyAccessToken, verifyRefreshToken } from '../middlewares/auth.middleware.js';
import transporter from '../services/nodemailer.service.js';

class UserController {
    async Register(req, res, next) {
        try {
            const { userName, email } = req.body;
            console.log(userName);
            const userUN = await User.findOne({ userName });
            const userEmail = await User.findOne({ email });

            if (userUN) {
                return res.json({
                    message: 'Username is already exists',
                });
            }
            if (userEmail) {
                return res.json({
                    message: 'Email is already exists',
                });
            }

            const userRegister = new User(req.body);
            await userRegister.save();
            return res.status(200).json({
                message: 'Register successfully!',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async Login(req, res, next) {
        try {
            const { userName, password } = req.body;
            const user = await User.findOne({ userName });
            if (!user) {
                return res.status(406).json({
                    message: 'Invalid username',
                });
            }
            if (user.isLock == 1 || user.isLock == true) {
                return res.status(401).json({
                    message: 'The user is locked',
                });
            }
            const isValidPass = await user.isCheckPassword(password);
            if (!isValidPass) {
                return res.status(401).json({
                    message: 'Password is not valid',
                });
            }
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            // console.log(token, user._id.toString());
            // setDaily(user._id.toString(), token, 60);
            await client.set(user._id.toString(), refreshToken, {
                EX: 3600 * 24 * 7,
            });
            res.json({ accessToken, refreshToken });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async ChangePassword(req, res) {
        try {
            const { _id } = req.payload;
            const user = await User.findById(_id);
            const { oldPassword, newPassword } = req.body;
            const isValidPass = await user.isCheckPassword(oldPassword);
            if (!isValidPass) {
                return res.status(400).json({
                    message: 'Old password is not valid',
                });
            }
            user.password = newPassword;
            await user.save();
            return res.status(200).json({
                message: 'Change password successfully',
            });
        } catch (error) {
            throw error;
        }
    }

    async ForgotPassword(req, res) {
        try {
            const { email } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                res.status(400).json({
                    message: 'The email is not registerd',
                });
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
            res.status(200).json({
                message: 'Send otp to your email successfully!',
                otpToken,
            });
        } catch (error) {
            throw error;
        }
    }

    async RecoveryPassword(req, res) {
        try {
            const { email } = req.payload;
            const { otp, newPassword } = req.body;
            const otpEmail = parseInt(await client.get(email.concat('_otp').toString()));
            if (!otpEmail) {
                return res.status(400).json({
                    message: 'OTP expired',
                });
            }
            if (otp != otpEmail) {
                return res.status(400).json({
                    message: 'Invalid OTP',
                });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: 'User is not found',
                });
            }
            user.password = newPassword;
            await user.save();
            await client.del(email.concat('_otp').toString());
            return res.status(200).json({
                message: 'Recover password successfully!',
            });
        } catch (error) {
            throw error;
        }
    }

    async Profile(req, res, next) {
        try {
            const { _id } = req.payload;
            const user = await User.findById(_id);
            return res.json({
                data: user,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async EditProfile(req, res, next) {
        try {
            const { _id } = req.payload;
            const { userName } = req.body;
            if (userName) {
                return res.status(401).json({
                    message: 'Can not change this field',
                });
            }
            await User.findByIdAndUpdate(_id, req.body);
            return res.json({
                message: 'Edit profile successfully',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async RefreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                throw createError.BadRequest();
            }
            const { _id } = await verifyRefreshToken(refreshToken);
            const accessToken = await signAccessToken(_id);
            const newRefreshToken = await signAccessToken(_id);
            return res.json({
                accessToken,
                refreshToken: newRefreshToken,
            });
        } catch (error) {
            throw createError.InternalServerError();
        }
    }

    async Logout(req, res, next) {
        try {
            console.log(req.payload);
            const { _id } = req.payload;
            const refreshToken = await client.get(_id.toString());
            if (!refreshToken) {
                throw createError.Forbidden();
            }
            // const { _id } = await verifyRefreshToken(refreshToken);
            await client.del(_id.toString());
            return res.status(200).json({
                message: 'Logout!',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async AddPayment(req, res, next) {
        try {
            const { _id } = req.payload;
            const paymentCurrent = await User.findById(_id, 'payment');
            if (paymentCurrent.payment) {
                return res.json({
                    message: 'User already has payment',
                });
            }
            const newPayment = new Payment(req.body);
            const savePayment = await newPayment.save();

            const paymentId = savePayment._id;
            await User.findByIdAndUpdate(_id, { payment: paymentId });
            return res.status(200).json({
                message: 'Add payment successfully',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async UpdatePayment(req, res, next) {
        try {
            const { _id } = req.payload;
            const paymentCurrent = await User.findById(_id, 'payment');
            const paymentId = paymentCurrent.payment;
            if (!paymentId) {
                return res.json({
                    message: 'The user does not have a payment',
                });
            }
            await Payment.findByIdAndUpdate(paymentId, req.body);
            return res.json({
                message: 'Update payment successfully',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new UserController();
