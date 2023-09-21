import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'louistart0ggy@gmail.com',
        pass: 'vunutqlwkyttstyi',
    },
});

export default transporter;
