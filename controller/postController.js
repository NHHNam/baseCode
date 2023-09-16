const Post = require("../model/Post");

const postController = {
    addPost: async(req, res) => {
        try {
            const newPost = await new Post({
                title: req.body.title,
                description: req.body.description,
                userID: req.body.userID,
            });
            const post = await newPost.save();
            res.status(200).json(post);
        } catch (err) {
            res.status(500).json(err);
        }
    },
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
    }
}
module.exports = postController;