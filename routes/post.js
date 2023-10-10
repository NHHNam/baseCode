const middlewareController = require("../controller/middlewareController");
const postController = require("../controller/postController");
const upload = require("../cloudinary/cloudinary");
const router = require("express").Router();

//Route get post
router.get("/getPost", (req, res) => {
    const page = req.query.page;
    //Neu nhap trang thi hien thi noi dung trang do
    if (page) {
        postController.getPostByPage(req, res, parseInt(page) || 1);
    }
    //Khong nhap trang thi hien thi tat ca Post
    else {
        postController.getAllPost(req, res);
    }
});

//Route add Post
router.post("/addPost", middlewareController.verifyTokenAnAuth, postController.addPost);

//Route update Post
router.put("/updatePost/:id", middlewareController.verifyTokenAnAuth, postController.updatePost);

//Route delete Post
router.delete("/deletePost/:id", middlewareController.verifyTokenAnAuth, postController.deletePost);

//Route add Thumnail
router.post("/addThumnail/:id", middlewareController.verifyTokenAnAuth, upload.fields([{ name: "img", maxCount: 2 }]), postController.addThumnail);

//Route search Title
router.get("/SearchByTitle/:title", postController.searchByTitle);

//Route search Description
router.get("/SearchByDescription/:description", postController.searchByDescription);
module.exports = router;