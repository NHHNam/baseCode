const middlewareController = require("../controller/middlewareController");
const postController = require("../controller/postController");
const upload = require("../cloudinary/cloudinary");
const router = require("express").Router();

//Route get post
router.get("/getPost", (req, res) => {
    const page = req.query.page;
    if (page) {
        postController.getPostByPage(req, res, parseInt(page) || 1);
    } else {
        postController.getAllPost(req, res);
    }
});

//Route add Post
router.post("/addPost", middlewareController.verifyTokenAnAdminAuth, postController.addPost);

//Route update Post
router.put("/updatePost/:id", middlewareController.verifyTokenAnAdminAuth, postController.upadtePost);

//Route delete Post
router.delete("/deletePost/:id", middlewareController.verifyTokenAnAdminAuth, postController.deletePost);

//Route add Thumnail
router.post("/addThumnail/:id", middlewareController.verifyTokenAnAdminAuth, upload.fields([{ name: "img", maxCount: 2 }]), postController.addThumnail);

//Route search Title
router.get("/SearchByTitle/:title", postController.searchByTitle);

//Route search Description
router.get("/SearchByDescription/:description", postController.searchByDescription);

module.exports = router;