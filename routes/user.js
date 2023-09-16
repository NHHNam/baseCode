const userController = require("../controllers/userControllers");

const router = require("express").Router();

//GET ALL USERS
router.get("/", userController.getallUser);

//DELETE USERS
router.delete("/:id", userController.deleteUser);
module.exports = router;