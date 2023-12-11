import * as userService from '../services/user.service.js';
import * as paymentService from '../services/payment.service.js';
import userModel from '../models/user.model.js';
import paymentModel from '../models/payment.model.js';

class UserController {
    async Register(req, res, next) {
        const user = req.body;
        await userService.create(user);
        return res.status(200).json({
            message: 'Register successfully!',
        });
    }

    async Login(req, res, next) {
        const { userName, password } = req.body;
        const token = await userService.login(userName, password);
        res.json(token);
    }

    async ElasticSearch(req, res) {
        const { query } = req.query;
        const result = await userService.elasticSearch(query);
        return res.status(200).json(result);
    }

    async ChangePassword(req, res) {
        const { _id } = req.payload;
        const { oldPassword, newPassword } = req.body;
        userService.changePassword(_id, oldPassword, newPassword);
        return res.status(200).json({
            message: 'Change password successfully',
        });
    }

    async ForgotPassword(req, res) {
        const { email } = req.body;
        const otpToken = await userService.forgotPassword(email);
        return res.status(200).json({
            message: 'Send otp to your email successfully!',
            otpToken,
        });
    }

    async RecoveryPassword(req, res) {
        const { email } = req.payload;
        const { otp, newPassword } = req.body;
        userService.recoveryPassword(email, otp, newPassword);
        return res.status(200).json({
            message: 'Recover password successfully!',
        });
    }

    async Profile(req, res, next) {
        const { _id } = req.payload;
        const user = await userService.findById(_id);
        return res.json({
            data: user,
        });
    }

    async EditProfile(req, res, next) {
        const { _id } = req.payload;
        const { userName } = req.body;
        await userService.update(_id, req.body);
        return res.json({
            message: 'Edit profile successfully',
        });
    }

    async RefreshToken(req, res) {
        const { refreshToken } = req.body;
        return await userService.refreshToken(refreshToken);
    }

    async Logout(req, res, next) {
        const { _id } = req.payload;
        await userService.deleteRefreshToken(_id);
        return res.status(200).json({
            message: 'Logout!',
        });
    }

    async AddPayment(req, res, next) {
        console.log(456);
        const { _id: userId } = req.payload;
        await paymentService.create(userId, req.body);
        return res.status(200).json({
            message: 'Add payment successfully',
        });
    }

    async UpdatePayment(req, res, next) {
        const { _id: userId } = req.payload;
        await paymentService.update(userId, req.body);
        return res.status(200).json({
            message: 'Update payment successfully',
        });
    }

    async AtmTransaction(req, res) {
        const { _id: fromUserId } = req.payload;
        const userFrom = await userModel.findById(fromUserId);
        const { toUsername, amount } = req.body;
        const userTo = await userModel.findOne({ userName: toUsername });
        console.log(userFrom);
        console.log(userTo);

        await paymentService.atmTransaction(userFrom.payment.toString(), userTo.payment.toString(), amount);
        return res.status(200).json({
            message: 'Transfer is Ok',
        });
    }

    async GetPayment(req, res) {
        try {
            const { _id: userId } = req.payload;
            const user = await userModel.findById(userId);
            const paymentId = user.payment;
            if (!paymentId) throw new Error('User không có payment');
            console.log(paymentId);
            const payment = await paymentModel.findById(paymentId);
            return res.json(payment);
        } catch (error) {
            throw error;
        }
    }
}

export default new UserController();
