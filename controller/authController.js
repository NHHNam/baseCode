const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const userController = require("./userController");


let refreshTokens = [];
let count = 0;
const authController = {

    //Register user
    registerUser: async(req, res) => {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const newUser = await new User({
                username: req.body.username,
                fullName: req.body.fullName,
                password: hashed,
                paymentId: req.body.paymentId,

            });

            const user = await newUser.save();

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Generate AccesToken
    generateAccessToken: (user) => {
        return jwt.sign({
                id: user.id,
                role: user.role,
                username: user.username,
                paymentId: user.paymentId,
            },
            process.env.JWT_ACCESS_KEY, {
                expiresIn: "30m"
            });
    },

    //Generate RefreshToken
    generateRefreshToken: (user) => {
        return jwt.sign({
                id: user.id,
                role: user.role,
                username: user.username,
                paymentId: user.paymentId,
            },
            process.env.JWT_REFRESH_KEY, {
                expiresIn: "365d"
            });
    },

    //Login User
    loginUser: async(req, res) => {
        try {

            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Wrong username");
            }
            //Check Lock
            if (user.lock) {
                return res.status(403).json("User Locked");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                count = count + 1;
                // Lock User khi nhap sai mat khau >3 lan
                if (count > 3) {
                    const block = await userController.lockUser(req, res, true, user.id);
                } else {
                    res.status(404).json("Wrong password");
                }
            }
            if (user && validPassword) {
                count = 0;
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                const { password, ...others } = user._doc;
                return res.status(200).json({...others, accessToken });
            }

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //Request Refresh Token
    requestRefreshToken: async(req, res) => {

        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return refreshToken.status(401).json("You're not authenticated");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh Token not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({ accessToken: newAccessToken });
        })
    },

    //Log out User
    userLogout: async(req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Log out");
    }

};
module.exports = authController;