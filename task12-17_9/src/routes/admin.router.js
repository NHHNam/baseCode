import express from 'express';
import { verifyAdmin } from '../middlewares/auth.middleware.js';
// import controller
import AdminController from '../controllers/admin.controller.js';
const router = express.Router();

// post
router.get('/post', verifyAdmin, AdminController.ShowPost);
router.post('/post', verifyAdmin, AdminController.AddPost);
router.put('/post', verifyAdmin, AdminController.UpdatePost);
router.delete('/post', verifyAdmin, AdminController.DeletePost);

export default router;
