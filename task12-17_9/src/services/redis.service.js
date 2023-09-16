// const client = require('../databases/init.mongodb')
// const { promisify } = require("util")

// const REDIS_GET = promisify(client.get).bind(client);
// const REDIS_SET = promisify(client.set).bind(client);
// const REDIS_LRANGE = promisify(client.lrange).bind(client);

// module.exports = {
//     REDIS_GET,
//     REDIS_SET,
//     REDIS_LRANGE
// }

import client from '../databases/redis.init.js';

export const setDaily = async (key, value, time) => {
    try {
        return new Promise((resolve, reject) => {
            client.set(key, value, 'EX', 60, (error, result) => {
                console.log(result);
                return error ? reject(error) : resolve(result);
            });
        });
    } catch (error) {
        console.log(`error::::::${error}`);
    }
};

export const set = async (key, value) => {
    try {
        return new Promise((resolve, reject) => {
            client.set(key, value, (error, result) => {
                console.log(result);
                return error ? reject(error) : resolve(result);
            });
        });
    } catch (error) {
        console.log(`error::::::${error}`);
    }
};

export const get = async (key) => {
    try {
        return new Promise((resolve, reject) => {
            client.get(key, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    } catch (error) {
        console.log(`error::::::${error}`);
    }
};

export const incrby = async (key, count) => {
    try {
        return new Promise((resolve, reject) => {
            client.incrby(key, count, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    } catch (error) {
        console.log(`error::::::${error}`);
    }
};

export const decrby = async (key, count) => {
    try {
        return new Promise((resolve, reject) => {
            client.decrby(key, count, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    } catch (error) {
        console.log(`error::::::${error}`);
    }
};

export const exists = async (key) => {
    try {
        return new Promise((resolve, reject) => {
            client.exists(key, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    } catch (error) {
        console.log(`error::::::${error}`);
    }
};

// chỉ hoạt động đúng 1 lần
export const setnx = async (key, count) => {
    try {
        return new Promise((resolve, reject) => {
            client.setnx(key, count, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });
    } catch (error) {
        console.log(`error::::::${error}`);
    }
};
