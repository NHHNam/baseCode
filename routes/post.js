const middlewareController = require("../controller/middlewareController");
const postController = require("../controller/postController");
const upload = require("../cloudinary/cloudinary");
const router = require("express").Router();

//Route add Post
router.post("/", middlewareController.verifyTokenAnAdminAuth, postController.addPost);

//Route update Post
router.put("/:id", middlewareController.verifyTokenAnAdminAuth, postController.upadtePost);

//Route delete Post
router.delete("/:id", middlewareController.verifyTokenAnAdminAuth, postController.deletePost);

//Route add Thumnail
router.post("/addThumnail/:id", upload.fields([{ name: "img", maxCount: 2 }]), middlewareController.verifyTokenAnAdminAuth, postController.addThumnail);
module.exports = router;