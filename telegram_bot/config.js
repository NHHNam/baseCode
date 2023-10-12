const TelegramBot = require('node-telegram-bot-api');
const bcrypt = require("bcrypt");
const User = require("../model/user");
const token = process.env.TOKEN_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async(msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name;
    let message = "Không hợp lệ";
    if (msg.text === "Hi") {
        message = 'Xin chào ' + firstName + ' ' + lastName + '\nChúc bạn có một ngày tốt lành.';

    } else if (msg.text.includes("new_user")) {
        const parts = msg.text.split(";");
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
    } else if (msg.text.includes("update_user")) {
        const parts = msg.text.split(";");
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
    } else if (msg.text.includes("delete_user")) {
        const parts = msg.text.split("_");
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
    }
    bot.sendMessage(chatId, message);
});