import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import cloudinary from '../services/cloudinary.service.js';
import transporter from '../services/nodemailer.service.js';

class AdminController {
    async AddPost(req, res, next) {
        try {
            var thumnail;
            if (req.file) {
                var result = await cloudinary.uploader.upload(req.file.path);
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
            const { postId, description, title } = req.body;
            const post = await Post.findByIdAndUpdate(postId, { description, title });
            if (!post) {
                return res.json({
                    message: 'Post is not found',
                });
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
            const result = await Post.findByIdAndDelete(postId);
            if (!result) {
                return res.json({
                    message: 'Post is not found',
                });
            }
            return res.status(200).json({
                message: 'Delete post successfully',
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    TestMulter(req, res, next) {
        try {
            cloudinary.uploader.upload(req.file.path, (err, result) => {
                if (err) throw new Error(err);
                res.json(result);
            });
        } catch (error) {
            throw new Error(error);
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
}

export default new AdminController();
