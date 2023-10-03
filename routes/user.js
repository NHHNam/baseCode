const middlewareController = require("../controller/middlewareController");
const userController = require("../controller/userController");
const user = require("../model/user");
const router = require("express").Router();

//Route get User
router.get("/getUser", (req, res) => {
    const page = req.query.page;
    if (page) {
        userController.getUserByPage(req, res, parseInt(page) || 1);
    } else {
        userController.getAllUser(req, res);
    }
});

//Route update User
router.put("/updateUser/:id", middlewareController.verifyTokenAnUserAuth, userController.updateUser);

//Route update role User
router.put("/updateRole/:id", middlewareController.verifyTokenAnAdminAuth, userController.updateRoleUser);

//Route update lock User
router.put("/lockUser/:id", middlewareController.verifyTokenAnAdminAuth, (req, res) => userController.lockUser(req, res));

//Route change password User
router.put("/changePassword/:id", middlewareController.verifyTokenAnUserAuth, userController.changePassword);

//Route refresh password User
router.post("/refreshPassword/:id", middlewareController.verifyTokenAnAdminAuth, userController.refreshPassword);

//Route send OTP
router.post("/forgotPassword/:id", userController.forgotPassword);

//Route verify OTP and password
router.post("/verifyOTPAndUpdatePassword/:id", userController.verifyOTPAndUpdatePassword);

//Route search by username
router.get("/SearchByUsername/:username", userController.searchByUsername);

//Route search by fullname
router.get("/SearchByFullname/:fullName", userController.searchByFullname);

//Route search by point
router.get("/SearchByPoint/:point", userController.searchByPoint);

//Route search by lock
router.get("/SearchByRole/:role", userController.searchByRole);

//Route search by email
router.get("/SearchByEmail/:email", userController.searchByEmail);
module.exports = router;