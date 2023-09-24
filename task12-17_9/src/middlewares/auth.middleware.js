import JWT from 'jsonwebtoken';
import User from '../models/user.model.js';

export const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized',
        });
    }
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

export const verifyAccessToken = (token) => {
    const keySecret = process.env.KEY_SECRET_TOKEN;

    return new Promise((resolve, reject) => {
        JWT.verify(token, keySecret, (err, payload) => {
            if (err) {
                return reject(err);
            }
            resolve(payload);
        });
    });
};

export const verifyRefreshToken = (token) => {
    const keySecret = process.env.KEY_SECRET_TOKEN;

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
        console.log(payload);
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
        next();
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
