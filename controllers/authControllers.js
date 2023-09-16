const User = require("../models/user");
const bcrypt = require("bcrypt");
const { use } = require("../routes/auth");

const authControllers = {
    //Register
    registerUser: async(req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Crear new user
            const newUser = await new User({
                userName: req.body.userName,
                password: hashed,
            });

            //save DB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //LOGIN
    loginUser: async(req, res) => {
        try {
            const user = await User.findOne({ userName: req.body.userName });
            if (!user) {
                res.status(404).json("Wrong username! ");
            }
            const valiPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!valiPassword) {
                res.status(404).json("Wrong passwork");
            }
            if (user && valiPassword) {
                res.status(200).json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = authControllers;