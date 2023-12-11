import JWT from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyAdmin = (req, res, next) => {
    console.log(req.headers['authorization']);
    const bearerToken = req.headers['authorization'];
    if (!bearerToken) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    const token = bearerToken.split(' ')[1];
    const keySecret = process.env.KEY_SECRET_TOKEN;
    JWT.verify(token, keySecret, async (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: err.message,
            });
        }
        const id = payload._id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const isAdmin = user.role === 'admin';
        if (!isAdmin) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        req.payload = payload;
        next();
    });
};

export const verifyAccessToken = (accessToken) => {
    const keySecret = process.env.KEY_SECRET_TOKEN;
    const token = accessToken.split(' ')[1];

    return new Promise((resolve, reject) => {
        JWT.verify(token, keySecret, (err, payload) => {
            if (err) {
                return reject(err);
            }
            resolve(payload);
        });
    });
};

export const verifyRefreshToken = (refreshToken) => {
    const keySecret = process.env.KEY_SECRET_TOKEN;
    const token = refreshToken.split(' ')[1];

    return new Promise((resolve, reject) => {
        JWT.verify(token, keySecret, (err, payload) => {
            if (err) {
                return reject(err);
            }
            resolve(payload);
        });
    });
};

export const verifyUser = (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if (!bearerToken) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    const token = bearerToken.split(' ')[1];
    JWT.verify(token, process.env.KEY_SECRET_TOKEN, async (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: err.message,
            });
        }
        const id = payload._id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        const isUser = user.role === 'user';
        if (!isUser) {
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
        req.payload = payload;
        return next();
    });
};

export const verifyOtp = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
    JWT.verify(token, process.env.KEY_SECRET_TOKEN, async (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: err.message,
            });
        }
        req.payload = payload;
        next();
    });
};
