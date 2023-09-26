const authController = require("../controller/authController");
const middlewareController = require("../controller/middlewareController");

const router = require("express").Router();

//Route Register
router.post("/register", authController.registerUser);

//Route Login
router.post("/login", authController.loginUser);

//Route refresh token
router.post("/refresh", authController.requestRefreshToken);

//Route Logout
router.post("/logout", (req, res, next) => {
    if (middlewareController.verifyTokenAnUserAuth) {
        authController.userLogout(req, res);
    } else {
        authController.userLogout(req, res);
    }
});
module.exports = router;