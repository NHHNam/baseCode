import JWT from 'jsonwebtoken';

export const signAccessToken = (_id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
        };
        const keySecret = process.env.KEY_SECRET_TOKEN;
        const options = {
            expiresIn: '2d', //1 month
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

export const signRefreshToken = (_id) => {
    return new Promise((resolve, reject) => {
        const payload = {
            _id,
        };
        const keySecret = process.env.KEY_SECRET_TOKEN;
        const options = {
            expiresIn: '7d', //1 month
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
