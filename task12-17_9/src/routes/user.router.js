import express from 'express';
import { verifyUser } from '../middlewares/auth.middleware.js';
// import controller
import UserController from '../controllers/user.controller.js';
const router = express.Router();

router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.get('/profile', verifyUser, UserController.Profile);
router.put('/profile', verifyUser, UserController.EditProfile);
router.delete('/logout', UserController.Logout);

// payment
router.post('/payment', verifyUser, UserController.AddPayment);
router.put('/payment', verifyUser, UserController.UpdatePayment);

export default router;
