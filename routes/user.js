const middlewareController = require("../controller/middlewareController");
const userController = require("../controller/userController");
const user = require("../model/user");
const router = require("express").Router();

//Route get all User
router.get("/", middlewareController.verifyToken, userController.getAllUser);

//Route update User
router.put("/:id", middlewareController.verifyToken, userController.updateUser);

//Route update role User
router.put("/updateRole/:id", middlewareController.verifyTokenAnAdminAuth, userController.updateRoleUser);

//Route update lock User
//router.put("/lockUser/:id", userController.lockUser);
router.put("/lockUser/:id", middlewareController.verifyTokenAnAdminAuth, (req, res) => userController.lockUser(req, res));

//Route change password User
router.put("/changePassword/:id", middlewareController.verifyToken, userController.changePassword);

//Route refresh password User
router.post("/refreshPassword/:id", middlewareController.verifyTokenAnAdminAuth, userController.refreshPassword);

//Route send OTP
router.post("/forgotPassword/:id", userController.forgotPassword);

//Route verify OTP and password
router.post("/verifyOTPAndUpdatePassword/:id", userController.verifyOTPAndUpdatePassword);
module.exports = router;