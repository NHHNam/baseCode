import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import { signToken } from '../services/jwt.service.js';
import { setDaily } from '../services/redis.service.js';
import client from '../databases/redis.init.js';

class AdminController {
    async AddPost(req, res, next) {
        try {
            const { _id } = req.payload;
            const post = new Post({ ...req.body, userId: _id });
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
}

export default new AdminController();
