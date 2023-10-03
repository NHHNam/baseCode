const Post = require("../model/Post");
const PAGE_SIZE = 2;

const postController = {
    //Get Page
    getPostByPage: async(req, res, page) => {
        try {
            const skip = (page - 1) * PAGE_SIZE;
            const posts = await Post.find()
                .skip(skip)
                .limit(PAGE_SIZE);

            res.status(200).json(posts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //Get All 
    getAllPost: async(req, res) => {
        try {
            const posts = await Post.find();
            res.status(200).json(posts);

        } catch (err) {
            res.status(500).json(err)
        }
    },

    //Add Post
    addPost: async(req, res) => {
        try {
            const newPost = await new Post({
                title: req.body.title,
                description: req.body.description,
                userID: req.body.userID,
                thumNail: req.body.thumNail,
            });
            const post = await newPost.save();
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Update Post
    upadtePost: async(req, res) => {
        try {

            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        userID: req.body.userID,
                    }
                }, { new: true }
            );
            if (!updatedPost) {
                return res.status(404).json("Post not found");
            }
            res.status(200).json(updatedPost);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Delete Post
    deletePost: async(req, res) => {
        try {
            const deletedPost = await Post.deleteOne({ _id: req.params.id });
            if (deletedPost.deletedCount === 1) {
                res.status(200).json({ message: "Post deleted successfully" });
            } else {
                res.status(404).json({ error: "Post not found" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Add Thumnail 
    addThumnail: async(req, res) => {
        try {
            //Get path
            const link_img = req.files['img'][0].path;
            //Upadate Path in DB
            const addThumnail = await Post.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        thumNail: link_img
                    }
                }, { new: true }
            );
            if (!addThumnail) {
                return res.status(404).json("Post not found");
            }
            res.status(200).json(addThumnail);
        } catch (err) {
            res.status(500).json(err);

        }
    },

    //Search Title
    searchByTitle: async(req, res) => {
        try {
            const result = await Post.find({ title: { $regex: req.params.title, $options: 'i' } });
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Search Description
    searchByDescription: async(req, res) => {
        try {
            const result = await Post.find({ description: { $regex: req.params.description, $options: 'i' } });
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
module.exports = postController;