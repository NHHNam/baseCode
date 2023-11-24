import * as userService from '../services/user.service.js';
import * as paymentService from '../services/payment.service.js';

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
        const { toUserId, amount } = req.body;
        await paymentService.atmTransaction(fromUserId, toUserId, amount);
        return res.status(200).json({
            message: 'Transfer is Ok',
        });
    }
}

export default new UserController();
