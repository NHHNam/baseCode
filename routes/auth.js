const authControllers = require("../controllers/authControllers");

const router = require("express").Router();

//REGSISTER
router.post("/register", authControllers.registerUser);

//LOGIN
router.post("/login", authControllers.loginUser);
module.exports = router;