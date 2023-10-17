const User = require("../model/user");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");
const redis = require("redis");
const client = redis.createClient();
const generateOTP = require("../utils/generateOTP");
const randomPassword = require("../utils/randomPassword");
const Redis = require("../utils/redis");
const Mail = require("nodemailer/lib/mailer");
const PAGE_SIZE = 2;
const logEvent = require("../helper/logEvent");

const userController = {
    //Get Page
    getUserByPage: async(req, res, page) => {
        try {
            const skip = (page - 1) * PAGE_SIZE;
            const users = await User.find()
                .skip(skip)
                .limit(PAGE_SIZE);
            logEvent(`${req.url}-------${req.method}-------"Get Page User Succesfully"`);
            res.status(200).json(users);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Get Page User"`);
            res.status(500).json(err)
        }
    },

    //Get All User
    getAllUser: async(req, res) => {
        try {
            const user = await User.find();
            logEvent(`${req.url}-------${req.method}-------"Get User Succesfully"`);
            res.status(200).json(user);

        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Get User"`);
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
                logEvent(`${req.url}-------${req.method}-------"User not found"`);
                return res.status(404).json("User not found");
            }
            logEvent(`${req.url}-------${req.method}-------"Update User Succesfully"`);
            res.status(200).json(updatedUser);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Update User"`);
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
                logEvent(`${req.url}-------${req.method}-------"User not found"`);
                return res.status(404).json("User not found");
            }
            logEvent(`${req.url}-------${req.method}-------"Update Role Succesfully"`);
            res.status(200).json(updateRoledUser);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Update Role User"`);
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
                logEvent(`${req.url}-------${req.method}-------"User not found"`);
                return res.status(404).json("User not found");
            }
            if (!lockUser.lock) {
                logEvent(`${req.url}-------${req.method}-------"User Unlocked"`);
                res.status(200).json(" User Unlocked");
            } else {
                logEvent(`${req.url}-------${req.method}-------"User Locked"`);
                res.status(403).json(" User Locked");
            }
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Lock User"`);
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
                logEvent(`${req.url}-------${req.method}-------"New password is required"`);
                return res.status(400).json({ error: "New password is required" });
            }

            const user = await User.findById(userId);

            if (!user) {
                logEvent(`${req.url}-------${req.method}-------"User not found"`);
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
                logEvent(`${req.url}-------${req.method}-------"Change Password Successfully"`);
                res.status(200).json(changPassword);
            } else {
                logEvent(`${req.url}-------${req.method}-------"Old password is incorrect"`);
                res.status(401).json({ error: "Old password is incorrect" });
            }
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Change Password User"`);
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
                logEvent(`${req.url}-------${req.method}-------"Email not found"`);
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
            logEvent(`${req.url}-------${req.method}-------"Refresh Password Successfully"`);
            res.status(200).json("Send Password Successfully");
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Refresh Password User"`);
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
                logEvent(`${req.url}-------${req.method}-------"Email not found"`);
                return res.status(404).json({ error: "Email not found" });
            }
            const OTP = generateOTP();
            // Save OTP to Redis
            const saveOTP = Redis.saveOTPToRedis(email, OTP, 60, async function(err, reply) {
                if (err) {
                    return res.status(500).json(err);
                } else {

                    //Send Email
                    const rs = await sendMail(email, `OTP: ${OTP} \nLưu ý: Mã OTP có hết hiệu lực trong vòng 3 phút`, "OTP CODE");
                    logEvent(`${req.url}-------${req.method}-------"Send OTP Successfully"`);
                    res.status(200).json("Send OTP Successfully");
                }
            });

        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------"Error Forgot Password User"`);
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
                logEvent(`${req.url}-------${req.method}-------"Email not found"`);
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
                        logEvent(`${req.url}-------${req.method}-------"Verify OTP Successfully"`);
                        res.status(200).json(savePassword);
                    } else {
                        logEvent(`${req.url}-------${req.method}-------"Invalid OTP"`);
                        res.status(404).json("Invalid OTP");
                    }
                }

            });
        } catch (error) {
            logEvent(`${req.url}-------${req.method}-------"Error Verify OTP And New Password for User"`);
            res.status(500).json(error);
        }
    },

    //Search Username
    searchByUsername: async(req, res) => {
        try {
            const result = await User.find({ username: req.params.username });
            logEvent(`${req.url}-------${req.method}-------"Search By Username Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------" Error Search By Username"`);
            res.status(500).json(err);
        }
    },

    //Search Fullname
    searchByFullname: async(req, res) => {
        try {
            const result = await User.find({ fullName: req.params.fullName });
            logEvent(`${req.url}-------${req.method}-------"Search By Full Name Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------" Error Search By Full Name"`);
            res.status(500).json(err);
        }
    },

    //Search Point
    searchByPoint: async(req, res) => {
        try {
            const result = await User.find({ point: req.params.point });
            logEvent(`${req.url}-------${req.method}-------"Search By Point Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------" Error Search By Point"`);
            res.status(500).json(err);
        }
    },
    //Search Role
    searchByRole: async(req, res) => {
        try {
            const result = await User.find({ role: req.params.role });
            logEvent(`${req.url}-------${req.method}-------"Search By Role Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------" Error Search By Role"`);
            res.status(500).json(err);
        }
    },
    //Search Email
    searchByEmail: async(req, res) => {
        try {
            const result = await User.find({ email: req.params.email });
            logEvent(`${req.url}-------${req.method}-------"Search By Email Successfully"`);
            res.status(200).json(result);
        } catch (err) {
            logEvent(`${req.url}-------${req.method}-------" Error Search By Email"`);
            res.status(500).json(err);
        }
    }
}
module.exports = userController;