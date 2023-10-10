const middlewareController = require("../controller/middlewareController");
const userController = require("../controller/userController");
const user = require("../model/user");
const router = require("express").Router();

//Route get User
router.get("/getUser", middlewareController.verifyTokenAnAuth, (req, res) => {
    const page = req.query.page;
    //Neu nhap pae thi hien thi noi dung cho trang đo,
    if (page) {
        userController.getUserByPage(req, res, parseInt(page) || 1);
    }
    //Neu khong nhap thi hien thi tat ca User
    else {
        userController.getAllUser(req, res);
    }
});

//Route update User
router.put("/updateUser/:id", middlewareController.verifyTokenAnAuth, userController.updateUser);

//Route update role User
router.put("/updateRole/:id", middlewareController.verifyTokenAnAuth, userController.updateRoleUser);

//Route update lock User
router.put("/lockUser/:id", middlewareController.verifyTokenAnAuth, (req, res) => userController.lockUser(req, res));

//Route change password User
router.put("/changePassword/:id", middlewareController.verifyTokenAnAuth, userController.changePassword);

//Route refresh password User
router.post("/refreshPassword/:id", middlewareController.verifyTokenAnAuth, userController.refreshPassword);

//Route send OTP
router.post("/forgotPassword/:id", userController.forgotPassword);

//Route verify OTP and password
router.post("/verifyOTPAndUpdatePassword/:id", userController.verifyOTPAndUpdatePassword);

//Route search by username
router.get("/SearchByUsername/:username", middlewareController.verifyTokenAnAuth, userController.searchByUsername);

//Route search by fullname
router.get("/SearchByFullname/:fullName", middlewareController.verifyTokenAnAuth, userController.searchByFullname);

//Route search by point
router.get("/SearchByPoint/:point", middlewareController.verifyTokenAnAuth, userController.searchByPoint);

//Route search by lock
router.get("/SearchByRole/:role", middlewareController.verifyTokenAnAuth, userController.searchByRole);

//Route search by email
router.get("/SearchByEmail/:email", middlewareController.verifyTokenAnAuth, userController.searchByEmail);
module.exports = router;