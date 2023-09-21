//Random password
const otpGenerator = require('otp-generator');
const randomPassword = () => {
    const pass = otpGenerator.generate(10, { upperCaseAlphabets: true, specialChars: true, digits: true });
    return pass;
};
module.exports = randomPassword;