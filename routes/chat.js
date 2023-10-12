const chatController = require("../controller/chatController");
const router = require("express").Router();

//Route Real-time chat service
router.get("/", chatController.chat);
module.exports = router;