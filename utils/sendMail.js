const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

//Send email
const sendMail = asyncHandler(async(email, content, title) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        }
    });

    const info = await transporter.sendMail({
        from: '"VinJob" <no_relply@vinjob.com>',
        to: email,
        subject: title,
        text: content,
    });
    return info;

})
module.exports = sendMail;