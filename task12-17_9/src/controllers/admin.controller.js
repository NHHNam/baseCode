import User from '../models/user.model.js';
import * as postService from '../services/post.service.js';
import * as userService from '../services/user.service.js';
import * as paymentService from '../services/payment.service.js';

class AdminController {
    async AddPost(req, res, next) {
        const { _id: userId } = req.payload;
        await postService.create(req.file.path, req.body, userId);
        return res.status(200).json({
            message: 'Add post successfully',
        });
    }

    async ShowPost(req, res, next) {
        const posts = await postService.getAll(req.query);
        return res.status(200).json(posts);
    }

    async UpdatePost(req, res, next) {
        const { postId, ...postField } = req.body;
        await postService.update(postId, postField, req.file.path);
        return res.status(200).json({
            message: 'Update post successfully',
        });
    }

    async DeletePost(req, res, next) {
        const { postId } = req.body;
        await postService.destroy(postId);
        return res.status(200).json({
            message: 'Delete post successfully',
        });
    }

    async ShowUser(req, res) {
        const users = await userService.getAll(req.query);
        return res.status(200).json(users);
    }

    async LockUser(req, res) {
        const { userId } = req.body;
        await userService.lock(userId);
        return res.status(200).json({
            message: `Lock user ${userId} successfully!`,
        });
    }

    async RefreshPassword(req, res) {
        const { userId } = req.body;
        const user = await userService.refreshPassword(userId);
        return res.status(200).json({
            message: `Refresh password for ${user.email} successfully!`,
        });
    }

    async ShowPayment(req, res, next) {
        const payments = await paymentService.getAll(req.query);
        return res.status(200).json(payments);
    }

    async AddPayment(req, res) {
        console.log(req.body);
        const { _id } = req.payload;
        const { userId, ...paymentField } = req.body;
        const id = userId || _id;

        const user = await User.findById(id);
        if (user.role === 'admin') {
            if (user._id.toString() !== _id.toString()) {
                throw new Error("You can't add payment for this user");
            }
        }
        await paymentService.create(id, paymentField);
        return res.status(200).json({
            message: 'Add payment successfully!',
        });
    }

    async UpdatePayment(req, res) {
        const { _id } = req.payload;
        const { userId, ...paymentField } = req.body;
        const id = userId || _id;

        const user = await User.findById(id);
        if (user.role === 'admin') {
            if (user._id.toString() !== _id.toString()) {
                throw new Error("You can't add payment for this user");
            }
        }
        await paymentService.update(id, paymentField);
        return res.status(200).json({
            message: 'Update payment successfully!',
        });
    }
}

export default new AdminController();
