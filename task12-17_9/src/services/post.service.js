import Post from '../models/post.model.js';
import cloudinary from './cloudinary.service.js';
import { Types } from 'mongoose';
export const create = async (path, data, userId) => {
    try {
        if (!Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid user id format');
        }
        let thumnail;
        if (path) {
            const result = await cloudinary.uploader.upload(path);
            thumnail = result.url;
        }
        const post = new Post({ ...data, userId, thumnail });
        await post.save();
    } catch (error) {
        throw new Error('Cannot use create post service');
    }
};

export const getAll = async (queryReq) => {
    try {
        const { page = 1, search = null } = queryReq;
        const limit = 5;
        const query = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const options = {
            limit,
            page,
            populate: {
                path: 'userId',
                model: 'user',
                select: {
                    _id: 0,
                    email: 1,
                    fullName: 1,
                },
            },
            select: {
                _id: 0,
                createdAt: 0,
                updatedAt: 0,
            },
        };

        const posts = await Post.paginate(query, options);
        return posts;
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use get all post service');
    }
};

export const update = async (postId, data, path) => {
    try {
        let newThumnail;
        if (!Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid postId format');
        }
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post is not found');
        }

        if (path) {
            const thumnail = post.thumnail;
            const startIndex = thumnail.lastIndexOf('/') + 1;
            const endIndex = thumnail.lastIndexOf('.');
            const publicId = thumnail.slice(startIndex, endIndex);
            await cloudinary.uploader.destroy(publicId);
            const result = await cloudinary.uploader.upload(path);
            newThumnail = result.url;
            await Post.findByIdAndUpdate(postId, { ...data, thumnail: newThumnail });
        } else {
            await Post.findByIdAndUpdate(postId, data);
        }
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use update post service');
    }
};

export const destroy = async (postId) => {
    try {
        if (!Types.ObjectId.isValid(postId)) {
            throw new Error('Invalid postId format');
        }
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('The post is not found');
        }
        const url = post.thumnail;
        const startIndex = url.lastIndexOf('/') + 1;
        const endIndex = url.lastIndexOf('.');
        const publicId = url.slice(startIndex, endIndex);
        await cloudinary.uploader.destroy(publicId);
        await Post.findByIdAndDelete(postId);
    } catch (error) {
        console.log(error);
        throw new Error('Cannot use destroy post service');
    }
};
