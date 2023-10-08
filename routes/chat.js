const chatController = require("../controller/chatController");

const router = require("express").Router();
router.get("/", chatController.chat);
module.exports = router;