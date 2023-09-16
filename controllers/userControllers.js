const User = require("../models/user");

const userController = {
    //GET USER
    getallUser: async(req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch (err) {
            rex.status(500).json(err);
        }
    },

    //DELETE USER
    deleteUser: async(req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id); //findById
            res.status(200).json("Delete successfully");
        } catch (err) {
            rex.status(500).json(err);
        }
    },
};

module.exports = userController;