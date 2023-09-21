const User = require("../model/user");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
const redis = require("redis");
const client = redis.createClient();
const generateOTP = require("../utils/generateOTP");
const randomPassword = require("../utils/randomPassword");
const Redis = require("../utils/redis");
const Mail = require("nodemailer/lib/mailer");

const userController = {

    //Get All User
    getAllUser: async(req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);

        } catch (err) {
            res.status(500).json(err)

        }
    },

    //Update User
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
    },

    //Update Role User
    updateRoleUser: async(req, res) => {
        try {

            const updateRoledUser = await User.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        role: req.body.role
                    }
                }, { new: true }
            );
            if (!updateRoledUser) {
                return res.status(404).json("User not found");
            }
            res.status(200).json(updateRoledUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Lock User
    lockUser: async(req, res, isLock, userId) => {
        try {
            //Check isLock user, 
            if (!isLock) {
                isLock = req.body.lock;
                userId = req.params.id;
            }
            const lockUser = await User.findByIdAndUpdate(
                userId, {
                    $set: {
                        lock: isLock
                    }
                }, { new: true }
            );
            if (!lockUser) {
                return res.status(404).json("User not found");
            }
            if (!lockUser.lock) {
                res.status(200).json(" User Unlocked");
            } else {
                res.status(403).json(" User Locked");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Chang Password
    changePassword: async(req, res) => {
        try {
            const userId = req.params.id;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            if (!newPassword) {
                return res.status(400).json({ error: "New password is required" });
            }

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            //Compare oldPass with password in db
            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

            if (isPasswordMatch) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(newPassword, salt);
                const changPassword = await User.findByIdAndUpdate(
                    userId, {
                        $set: {
                            password: hashed
                        }
                    }, { new: true }
                );
                res.status(200).json(changPassword);
            } else {

                res.status(401).json({ error: "Old password is incorrect" });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Refresh Password
    refreshPassword: async(req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);

            //Check email
            if (!(user.email.includes(req.body.email))) {
                return res.status(404).json({ error: "Email not found" });
            }
            const password = randomPassword();
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            //Send email 
            const rs = await sendMail(req.body.email, `Mật khẩu mới: ${password}`, "REFRESH PASSWORD");

            const refreshPassword = await User.findByIdAndUpdate(
                userId, {
                    $set: {
                        password: hashed
                    }
                }, { new: true }
            );
            res.status(200).json("Send Password Successfully");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //Send OTP
    forgotPassword: async(req, res) => {
        try {
            const userId = req.params.id;
            const email = req.body.email;
            const user = await User.findById(userId);
            if (!(user.email.includes(req.body.email))) {
                return res.status(404).json({ error: "Email not found" });
            }
            const OTP = generateOTP();
            // Save OTP to Redis
            const saveOTP = Redis.saveOTPToRedis(email, OTP, 300, async function(err, reply) {
                if (err) {
                    return res.status(500).json(err);
                } else {

                    //Send Email
                    const rs = await sendMail(email, `OTP: ${OTP} \nLưu ý: Mã OTP có hết hiệu lực trong vòng 3 phút`, "OTP CODE");
                    res.status(200).json("Send OTP Successfully");
                }
            });

        } catch (err) {
            res.status(500).json(err)
        }
    },

    //Verify OTP and Password
    verifyOTPAndUpdatePassword: async(req, res) => {
        try {
            const userId = req.params.id;
            const email = req.body.email;
            const otp = req.body.otp;
            const password = req.body.password;
            const user = await User.findById(userId);

            //Check email
            if (!(user.email.includes(email))) {
                return res.status(404).json({ error: "Email not found" });
            }

            //Get OTP from Redis
            const otpFromRedis = await Redis.getOTPFromRedis(email, async function(err, otpFromRedis) {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    if (otpFromRedis === null) {
                        return res.status(404).json({ error: "OTP not found" });
                    }
                    if (otp === otpFromRedis) {
                        const salt = await bcrypt.genSalt(10);
                        const hashed = await bcrypt.hash(password, salt);
                        const savePassword = await User.findByIdAndUpdate(
                            userId, {
                                $set: {
                                    password: hashed,
                                    lock: false
                                }
                            }, { new: true }
                        );

                        res.status(200).json(savePassword);
                    } else {
                        res.status(404).json("Invalid OTP");
                    }
                }

            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
module.exports = userController;