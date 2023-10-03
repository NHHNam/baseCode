import express from 'express'
import UserController from '../controller/userController'
import authMiddleware from '../middleware/auth.user';
const userRouter = express.Router();
userRouter.get("/", UserController.getUser);
userRouter.post("/signIn",UserController.handleSignIn)
userRouter.post("/login",UserController.handleLogin)
userRouter.post("/logout",authMiddleware,UserController.handleLogout)
userRouter.post("/testAuthen",authMiddleware,UserController.testAuth)
userRouter.post("/update",authMiddleware,UserController.handleUpdateUser)
userRouter.post("/updatePayment",authMiddleware,UserController.handleUpdatePayment)
userRouter.post("/addPayment",authMiddleware,UserController.handleAddPayment)
userRouter.post("/searchPayment",authMiddleware,UserController.handleSearchPayment)
userRouter.post("/changePassword",authMiddleware,UserController.handleChangePassword)
userRouter.post("/forgetPassword",authMiddleware,UserController.handleSendOpt)
userRouter.post("/handleChangePassword",authMiddleware,UserController.handleForgetPassword)
userRouter.post("/getDocument",authMiddleware,UserController.handleGetDocument)
userRouter.post("/search",UserController.handleSearchService)
export default userRouter