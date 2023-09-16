const middlewareController = require("../controller/middlewareController");
const userController = require("../controller/userController");
const router = require("express").Router();

router.get("/", middlewareController.verifyToken, userController.getAllUser);
router.put("/:id", middlewareController.verifyToken, userController.updateUser);
module.exports = router;