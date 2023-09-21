const redis = require("redis");
const client = redis.createClient();

const Redis = {

    //Save OTP to Redis
    saveOTPToRedis: async(email, OTP, expiresIn, callback) => {
        client.setex(email, expiresIn, OTP.toString(), (err, reply) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, reply);
            }
        });
    },

    //Get OTP from Redis
    getOTPFromRedis: async(email, callback) => {
        client.get(email, function(error, reply) {
            if (error) {
                console.error("Error:", error);
                callback(error, null);
            } else if (reply === null) {
                callback({ error: "OTP not found" }, null);
            } else {
                callback(null, reply);
            }
        });
    }
}
module.exports = Redis;