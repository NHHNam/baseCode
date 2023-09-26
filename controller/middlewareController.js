const jwt = require("jsonwebtoken");

const middlewareController = {

    //Check Token
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const acccessToken = token.split(" ")[1];
            jwt.verify(acccessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            });
        } else {
            res.status(401).json("You're not authenticated ");
        }

    },

    //Check User
    verifyTokenAnUserAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === ("user")) {
                next();
            } else {
                res.status(403).json("You're not allowed access");
            }
        })
    },

    //Check Admin
    verifyTokenAnAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.role === ("admin")) {
                next();
            } else {
                res.status(403).json("You're not allowed access");
            }
        });
    },
};
module.exports = middlewareController;