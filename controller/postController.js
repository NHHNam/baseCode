const Post = require("../model/Post");

const postController = {

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
    }
}
module.exports = postController;