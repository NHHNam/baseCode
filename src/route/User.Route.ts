import express from 'express'
import UserController from '../controller/userController'
import authMiddleware from '../middleware/auth.user';
const userRouter = express.Router();
userRouter.get("/", UserController.getUser);
userRouter.post("/signIn",UserController.handleSignIn)
/** POST Methods */
    /**
    * @openapi
    * '/api/user/register':
    *  post:
    *     tags:
    *     - User Controller
    *     summary: Create a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - username
    *              - email
    *              - password
    *            properties:
    *              username:
    *                type: string
    *                default: johndoe 
    *              email:
    *                type: string
    *                default: johndoe@mail.com
    *              password:
    *                type: string
    *                default: johnDoe20!@
    *     responses:
    *      201:
    *        description: Created
    *      409:
    *        description: Conflict
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
userRouter.post("/login",UserController.handleLogin)
userRouter.post("/logout",authMiddleware,UserController.handleLogout)
userRouter.post("/testAuthen",authMiddleware,UserController.testAuth)
userRouter.post("/update",authMiddleware,UserController.handleUpdateUser)
userRouter.post("/updatePayment",authMiddleware,UserController.handleUpdatePayment)
userRouter.post("/addPayment",authMiddleware,UserController.handleAddPayment)
userRouter.post("/searchPayment",authMiddleware,UserController.handleSearchPayment)
userRouter.post("/changePassword",authMiddleware,UserController.handleChangePassword)
userRouter.post("/forgetPassword",UserController.handleSendOpt)
userRouter.post("/handleChangePassword",UserController.handleForgetPassword)
userRouter.post("/getDocument",UserController.handleGetDocument)
userRouter.post("/search",UserController.handleSearchService)
export default userRouter