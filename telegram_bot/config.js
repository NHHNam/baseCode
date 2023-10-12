const TelegramBot = require('node-telegram-bot-api');
const bcrypt = require("bcrypt");
const User = require("../model/user");
const Post = require("../model/Post");
const Payment = require("../model/Payment");
const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name;
    let message = "Không hợp lệ";
    if (msg.text === "Hi") {
        message = 'Xin chào ' + firstName + ' ' + lastName + '\nChúc bạn có một ngày tốt lành.';

    } else if (msg.text.includes("new")) {
        const parts = msg.text.split(";");
        const temp = parts[0].split("_");
        const key = temp[1];
        switch (key) {
            case "user":
                {
                    if (parts.length === 4) {
                        const username = parts[1];
                        let password = parts[2];
                        const name = parts[3];
                        const salt = await bcrypt.genSalt(10);
                        let hashed = await bcrypt.hash(password, salt);
                        const newUser = new User({
                            username: username,
                            fullName: name,
                            password: hashed

                        });
                        const user = newUser.save();
                        if (user) {
                            message = "Người dùng " + username + " đã được tạo thành công";
                        } else {
                            message = "Tạo người dùng thất bại";
                        }

                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng: new_user;username;password;name';
                    }
                    break;

                }
            case "post":
                {
                    if (parts.length === 3) {
                        const title = parts[1];
                        let description = parts[2];

                        const newPost = new Post({
                            title: title,
                            description: description

                        });
                        const post = newPost.save();
                        if (post) {
                            message = "Tạo bài Post thành công";
                        } else {
                            message = "Tạo bài Post thất bại";
                        }

                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng: new_post;title;description';
                    }
                    break;
                }
            case "payment":
                {
                    if (parts.length === 4) {
                        const cardID = parts[1];
                        const fullName = parts[2];
                        const nameCard = parts[3];

                        const newPayment = new Payment({
                            cardId: cardID,
                            fullName: fullName,
                            nameCard: nameCard

                        });
                        const payment = newPayment.save();
                        if (payment) {
                            message = "Tạo Payment thành công";
                        } else {
                            message = "Tạo Payment thất bại";
                        }

                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng: new_ayment;cardID;fullName,nameCard';
                    }
                    break;
                }
        }

    } else if (msg.text.includes("update")) {
        const parts = msg.text.split(";");
        const temp = parts[0].split("_");
        const key = temp[1];

        switch (key) {
            case 'user':
                {
                    if (parts.length === 4) {
                        const username = parts[1];
                        const password = parts[2];
                        const name = parts[3];

                        const salt = await bcrypt.genSalt(10);
                        const hashed = await bcrypt.hash(password, salt);

                        try {
                            const updatedUser = await User.findOneAndUpdate({ username: username }, { fullName: name, password: hashed }, { new: true });

                            if (updatedUser) {
                                message = 'Thông tin của người dùng ' + updatedUser.username + ' đã được cập nhật.';
                            } else {
                                message = 'Không tìm thấy người dùng hoặc có lỗi khi cập nhật thông tin.';
                            }
                        } catch (error) {
                            message = 'Có lỗi xảy ra: ' + error.message;
                        }
                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng: update_user;username;password;name';
                    }
                    break;
                }
            case 'post':
                {
                    if (parts.length === 3) {
                        const title = parts[1];
                        let description = parts[2];

                        try {
                            const updatedPost = await Post.findOneAndUpdate({ title: title }, { description: description }, { new: true });

                            if (updatedPost) {
                                message = 'Cập nhật bài Post thành công';
                            } else {
                                message = 'Không tìm thấy bài Post';
                            }
                        } catch (error) {
                            message = 'Có lỗi xảy ra: ' + error.message;
                        }
                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng: update_post;title;description';
                    }
                    break;
                }
            case 'payment':
                {
                    if (parts.length === 4) {
                        const cardID = parts[1];
                        const fullName = parts[2];
                        const nameCard = parts[3];

                        try {
                            const updatedPayment = await Post.findOneAndUpdate({ cardId: cardID }, { fullName: fullName }, { nameCard: nameCard }, { new: true });

                            if (updatedPayment) {
                                message = 'Cập nhật Payment thành công';
                            } else {
                                message = 'Không tìm thấy Payment';
                            }
                        } catch (error) {
                            message = 'Có lỗi xảy ra: ' + error.message;
                        }
                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng: update_payment;cardID;fullName;nameCard';
                    }
                    break;
                }

        }

    } else if (msg.text.includes("delete")) {
        const parts = msg.text.split("_");
        const key = parts[1];

        switch (key) {
            case "user":
                {
                    if (parts.length === 3) {
                        const id = parts[2];
                        const deletedUser = await User.findByIdAndDelete({ _id: id });
                        if (deletedUser) {
                            message = "Xóa thành công người dùng ";
                        } else {
                            message = "Không tìm thấy người dùng ";
                        }
                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng:delete_user_idUser';
                    }
                    break;
                }
            case 'post':
                {
                    if (parts.length === 3) {
                        const id = parts[2];
                        const deletedPost = await Post.findByIdAndDelete({ _id: id });
                        if (deletedPost) {
                            message = "Xóa bài Post thành công ";
                        } else {
                            message = "Không tìm thấy bài Post ";
                        }
                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng:delete_post_idPost';
                    }
                    break;
                }
            case 'payment':
                {
                    if (parts.length === 3) {
                        const id = parts[2];
                        const deletedPayment = await Payment.findByIdAndDelete({ _id: id });
                        if (deletedPayment) {
                            message = "Xóa thành công Payment ";
                        } else {
                            message = "Không tìm thấy Payment ";
                        }
                    } else {
                        message = 'Sai định dạng, vui lòng nhập theo định dạng:delete_payment_idPayment';
                    }
                    break;

                }
        }

    }
    bot.sendMessage(chatId, message);
});