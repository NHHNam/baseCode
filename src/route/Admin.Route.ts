import express from 'express'
import AdminController from '../controller/adminController'
import authMiddleware from '../middleware/auth.admin';
import upload from '../config/multer.config';
const adminRouter = express.Router();
adminRouter.post("/updatePost",authMiddleware,AdminController.handleUpdatePost)
adminRouter.post("/addPost",authMiddleware,AdminController.handleAddPost)
adminRouter.delete("/delete",authMiddleware,AdminController.handleDeletePost)
adminRouter.post("/refreshPassword",authMiddleware,AdminController.handleRefreshPassword)
adminRouter.post("/addThumbnail",authMiddleware,upload.single('thumbnail'),AdminController.handAddThumbnail)
adminRouter.post("/lockUser",authMiddleware,AdminController.handleLockUser)
adminRouter.post("/updateRole",authMiddleware,AdminController.handleUpdateRole)
adminRouter.post("/updatePayment",authMiddleware,AdminController.handleUpdatePayment)
adminRouter.post("/addPayment",authMiddleware,AdminController.handleAddPayment)
adminRouter.delete("/delePayment",authMiddleware,AdminController.handleDeletePayment)
export default adminRouter