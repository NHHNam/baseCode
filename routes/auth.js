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
router.post("/logout", middlewareController.verifyToken, authController.userLogout);
module.exports = router;