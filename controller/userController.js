const User = require("../model/user");
const bcrypt = require("bcrypt");

const userController = {
    getAllUser: async(req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err)

        }
    },
    updateUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        password: hashed,
                        fullName: req.body.fullName,
                        paymentId: req.body.paymentId
                    }
                }, { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json("User not found");
            }
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
module.exports = userController;