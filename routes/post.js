const middlewareController = require("../controller/middlewareController");
const postController = require("../controller/postController");
const router = require("express").Router();

//Admin
router.post("/", middlewareController.verifyTokenAnAdminAuth, postController.addPost);
router.put("/:id", middlewareController.verifyTokenAnAdminAuth, postController.upadtePost);
router.delete("/:id", middlewareController.verifyTokenAnAdminAuth, postController.deletePost);
module.exports = router;