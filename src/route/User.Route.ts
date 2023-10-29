import express from 'express'
import UserController from '../controller/userController'
import authMiddleware from '../middleware/auth.user';
const userRouter = express.Router();
userRouter.post("/signIn",UserController.handleSignIn)
userRouter.post("/login",UserController.handleLogin)
userRouter.post("/logout",authMiddleware,UserController.handleLogout)
userRouter.post("/update",authMiddleware,UserController.handleUpdateUser)
userRouter.post("/updatePayment",authMiddleware,UserController.handleUpdatePayment)
userRouter.post("/addPayment",authMiddleware,UserController.handleAddPayment)
userRouter.post("/searchPayment",authMiddleware,UserController.handleSearchPayment)
userRouter.post("/changePassword",authMiddleware,UserController.handleChangePassword)
userRouter.post("/forgetPassword",UserController.handleSendOpt)
userRouter.post("/handleChangePassword",UserController.handleForgetPassword)
userRouter.post("/getDocument",UserController.handleGetDocument)
userRouter.post("/search",UserController.handleSearchService)
userRouter.get("/profile",authMiddleware,UserController.handleGetProfile)

export default userRouter