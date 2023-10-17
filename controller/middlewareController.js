const jwt = require("jsonwebtoken");
const logEvent = require("../helper/logEvent");

const middlewareController = {

    //Check Token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const acccessToken = token.split(" ")[1];
            jwt.verify(acccessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    logEvent(`${req.url}-------${req.method}-------"Token is not valid"`);
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            logEvent(`${req.url}-------${req.method}-------"You're not authenticated "`);
            return res.status(401).json("You're not authenticated ");
        }

    },

    //Check User/Admin
    verifyTokenAnAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user &&
                ((req.user.role === "user" && req.user.id == req.params.id) ||
                    req.user.role === "admin" ||
                    (req.user.role === "user" && req.user.paymentId == req.params.id))) {
                next();
            } else {
                logEvent(`${req.url}-------${req.method}-------"You're not allowed access "`);
                return res.status(403).json("You're not allowed access");
            }
        })
    }
};
module.exports = middlewareController;