import { Types } from 'mongoose';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Payment from '../models/payment.model.js';
import cloudinary from '../services/cloudinary.service.js';
import transporter from '../services/nodemailer.service.js';

class AdminController {
    async AddPost(req, res, next) {
        try {
            var thumnail;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                thumnail = result.url;
            }
            const { _id } = req.payload;
            const post = new Post({ ...req.body, userId: _id, thumnail });
            await post.save();
            return res.status(200).json({
                message: 'Add post successfully',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async ShowPost(req, res, next) {
        try {
            const posts = await Post.find();
            return res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async UpdatePost(req, res, next) {
        try {
            const { postId, ...postField } = req.body;
            let newThumnail;
            if (!Types.ObjectId.isValid(postId)) {
                return res.status(400).json({
                    message: 'Invalid postId format',
                });
            }
            const post = await Post.findById(postId);

            if (!post) {
                return res.json({
                    message: 'Post is not found',
                });
            }
            if (req.file) {
                const thumnail = post.thumnail;
                const startIndex = thumnail.lastIndexOf('/') + 1;
                const endIndex = thumnail.lastIndexOf('.');
                const publicId = thumnail.slice(startIndex, endIndex);
                await cloudinary.uploader.destroy(publicId);
                const result = await cloudinary.uploader.upload(req.file.path);
                newThumnail = result.url;
                await Post.findByIdAndUpdate(postId, { ...postField, thumnail: newThumnail });
            } else {
                await Post.findByIdAndUpdate(postId, postField);
            }

            return res.status(200).json({
                message: 'Update post successfully',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async DeletePost(req, res, next) {
        try {
            const { postId } = req.body;
            if (!Types.ObjectId.isValid(postId)) {
                return res.status(400).json({
                    message: 'Invalid postId format',
                });
            }
            const post = await Post.findById(postId);
            if (!post) {
                return res.json({
                    message: 'The post is not found',
                });
            }
            const url = post.thumnail;
            const startIndex = url.lastIndexOf('/') + 1;
            const endIndex = url.lastIndexOf('.');
            const publicId = url.slice(startIndex, endIndex);
            await cloudinary.uploader.destroy(publicId);
            await Post.findByIdAndDelete(postId);
            return res.status(200).json({
                message: 'Delete post successfully',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    async ShowUser(req, res) {
        try {
            const users = await User.find({ role: 'user' });
            if (!users) {
                return res.json({
                    message: 'Users is empty',
                });
            }
            return res.status(200).json(users);
        } catch (error) {
            throw error;
        }
    }

    async LockUser(req, res) {
        try {
            const { userId } = req.body;
            if (!Types.ObjectId.isValid(userId)) {
                return res.status(400).json({
                    message: 'Invalid userId format',
                });
            }
            const user = await User.findOne({ role: 'user', _id: userId });
            if (!user) {
                return res.json({
                    message: 'Users is not found',
                });
            }
            user.isLock = 1; // Lock user
            await user.save();
            return res.status(200).json({
                message: `Lock user ${userId} successfully!`,
            });
        } catch (error) {
            throw error;
        }
    }

    async RefreshPassword(req, res) {
        try {
            const { userId } = req.body;
            const user = await User.findById(userId);
            if (!user) {
                return res.json({
                    message: 'User is not found',
                });
            }
            if (user.role == 'admin') {
                return res.json({
                    message: 'Cannot refresh password for this user',
                });
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
            return res.status(200).json({
                message: `Refresh password for ${user.email} successfully!`,
            });
        } catch (error) {
            throw error;
        }
    }

    async AddPayment(req, res) {
        try {
            const { _id } = req.payload;
            const { userId, ...paymentField } = req.body;
            const id = userId || _id;
            if (!Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: 'Invalid id format',
                });
            }
            const user = await User.findById(id);
            console.log(user);
            if (!user) {
                return res.status(402).json({
                    message: 'User is not found',
                });
            }
            if (user.payment) {
                return res.status(402).json({
                    message: 'User is already exist a payment',
                });
            }
            const newPayment = new Payment(paymentField);
            const savePayment = await newPayment.save();
            const paymentId = savePayment._id;

            user.payment = paymentId;
            await user.save();
            return res.status(200).json({
                message: 'Add payment successfully!',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    }

    async UpdatePayment(req, res) {
        try {
            const { _id } = req.payload;
            const { userId, ...paymentField } = req.body;
            const id = userId || _id;
            if (!Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: 'Invalid id format',
                });
            }
            const user = await User.findById(id);
            if (!user) {
                return res.status(402).json({
                    message: 'User is not found',
                });
            }
            const paymentId = user.payment;
            if (!paymentId) {
                return res.status(402).json({
                    message: "User haven't payment yet",
                });
            } else {
                await Payment.findByIdAndUpdate({ _id: paymentId }, paymentField);

                return res.status(200).json({
                    message: 'Update payment successfully!',
                });
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new AdminController();
