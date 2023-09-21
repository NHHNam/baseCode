//Random OTP from 100000 to 999999
const generateOTP = () => {
    const min = 100000;
    const max = 999999;
    const OTP = Math.floor(Math.random() * (max - min + 1)) + min;
    return OTP;
};
module.exports = generateOTP;