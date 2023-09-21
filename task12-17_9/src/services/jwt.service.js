import JWT from 'jsonwebtoken';

export const signToken = (_id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
        };
        const keySecret = process.env.KEY_SECRET_TOKEN;
        const options = {
            expiresIn: 30 * 24 * 60 * 60, //1 month
        };
        JWT.sign(payload, keySecret, options, (err, token) => {
            if (err) {
                console.log(`err: ${err}`);
                reject(err);
            }
            resolve(token);
        });
    });
};

export const signOtpToken = (email) => {
    return new Promise((resolve, reject) => {
        const payload = {
            email,
        };
        const keySecret = process.env.KEY_SECRET_TOKEN;
        const options = {
            expiresIn: 5 * 60,
        };
        JWT.sign(payload, keySecret, options, (err, token) => {
            if (err) {
                console.log(`err: ${err}`);
                reject(err);
            }
            resolve(token);
        });
    });
};
