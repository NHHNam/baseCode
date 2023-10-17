const Post = require("../model/Post");
const PAGE_SIZE = 2;
const logEvent = require("../helper/logEvent");

const postController = {
    //Get Page
    getPostByPage: async(req, res, page) => {
        try {
            const skip = (page - 1) * PAGE_SIZE;
            const posts = await Post.find()
                .skip(skip)
                .limit(PAGE_SIZE);
            logEvent(`${req.url}-------${req.method}-------"Get Page Post Successfully"`);
            res.status(200).json(posts);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Get Page Post "`);
            res.status(500).json(err)
        }
    },

    //Get All 
    getAllPost: async(req, res) => {
        try {
            const posts = await Post.find();
            logEvent(`${req.url}-------${req.method}-------"Get Post Successfully"`);
            res.status(200).json(posts);

        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Get Post "`);
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
            logEvent(`${req.url}-------${req.method}-------"Add Post Successfully"`);
            res.status(200).json(post);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Add Post "`);
            res.status(500).json(err);
        }
    },

    //Update Post
    updatePost: async(req, res) => {
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
                logEvent(`${req.url}-------${req.method}-------"Post not found"`);
                return res.status(404).json("Post not found");
            }
            logEvent(`${req.url}-------${req.method}-------"Update Post Successfully"`);
            res.status(200).json(updatedPost);

        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Update Post "`);
            res.status(500).json(err);
        }
    },

    //Delete Post
    deletePost: async(req, res) => {
        try {
            const deletedPost = await Post.deleteOne({ _id: req.params.id });
            if (deletedPost.deletedCount === 1) {
                logEvent(`${req.url}-------${req.method}-------"Delete Post Successfully"`);
                res.status(200).json({ message: "Post deleted successfully" });
            } else {
                logEvent(`${req.url}-------${req.method}-------"Post not found"`);
                res.status(404).json({ error: "Post not found" });
            }
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Delete Post "`);
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
                logEvent(`${req.url}-------${req.method}-------"Post not found"`);
                return res.status(404).json("Post not found");
            }
            logEvent(`${req.url}-------${req.method}-------"Add Thumnail Successfully"`);
            res.status(200).json(addThumnail);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Add ThunNail"`);
            res.status(500).json(err);

        }
    },

    //Search Title
    searchByTitle: async(req, res) => {
        try {
            const result = await Post.find({ title: { $regex: req.params.title, $options: 'i' } });
            logEvent(`${req.url}-------${req.method}-------"Search Post By Title Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Search Post By Title"`);
            res.status(500).json(err);
        }
    },

    //Search Description
    searchByDescription: async(req, res) => {
        try {
            const result = await Post.find({ description: { $regex: req.params.description, $options: 'i' } });
            logEvent(`${req.url}-------${req.method}-------"Search Post By Description Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Search Post By Description"`);
            res.status(500).json(err);
        }
    }
}
module.exports = postController;