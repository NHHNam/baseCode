import User from '../models/user.model.js';
import Payment from '../models/payment.model.js';
import { signToken } from '../services/jwt.service.js';
import client from '../databases/redis.init.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

class UserController {
    async Register(req, res, next) {
        try {
            const { userName } = req.body;
            const user = await User.find({ userName });
            if (user.length > 0) {
                return res.json({
                    message: 'Username is really exists',
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
            const isValidPass = await user.isCheckPassword(password);
            if (!isValidPass) {
                return res.status(401).json({
                    message: 'Password is not valid',
                });
            }
            const token = await signToken(user._id);
            // console.log(token, user._id.toString());
            // setDaily(user._id.toString(), token, 60);
            await client.set(user._id.toString(), token, {
                EX: 30 * 24 * 60 * 60,
            });
            res.json({ token });
        } catch (error) {
            console.log(error);
            next(error);
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

    async Logout(req, res, next) {
        try {
            const { token } = req.body;
            if (!token) {
                return res.status(401).json({
                    message: 'Unauthorized',
                });
            }

            const { _id } = await verifyToken(token);
            const result = await client.del(_id.toString());

            if (!result) {
                return res.status(401).json({
                    message: 'Logout failed',
                });
            }

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
