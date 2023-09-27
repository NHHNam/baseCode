import express from 'express';

import { verifyAdmin } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

// import controller
import AdminController from '../controllers/admin.controller.js';
const router = express.Router();

// post
router.get('/post', verifyAdmin, AdminController.ShowPost);
router.post('/post', verifyAdmin, upload.single('fileUpload'), AdminController.AddPost);
router.put('/post', verifyAdmin, upload.single('fileUpload'), AdminController.UpdatePost);
router.delete('/post', verifyAdmin, AdminController.DeletePost);

// user
router.get('/user-list', verifyAdmin, AdminController.ShowUser);
router.patch('/lock-user', verifyAdmin, AdminController.LockUser);
router.patch('/refresh-password', verifyAdmin, AdminController.RefreshPassword);

// payment
router.post('/payment', verifyAdmin, AdminController.AddPayment);
router.put('/payment', verifyAdmin, AdminController.UpdatePayment);
export default router;
