import express from 'express';
import { verifyUser, verifyOtp } from '../middlewares/auth.middleware.js';
// import controller
import UserController from '../controllers/user.controller.js';
const router = express.Router();
// payment
router.get('/payment', verifyUser, UserController.AddPayment);
router.post('/payment', verifyUser, UserController.AddPayment);
router.put('/payment', verifyUser, UserController.UpdatePayment);

router.post('/register', UserController.Register);
router.post('/login', UserController.Login);
router.get('/profile', verifyUser, UserController.Profile);
router.put('/profile', verifyUser, UserController.EditProfile);
router.delete('/logout', verifyUser, UserController.Logout);
// user private
router.patch('/change-password', verifyUser, UserController.ChangePassword);
router.post('/forgot-password', UserController.ForgotPassword);
router.patch('/recovery-password', verifyOtp, UserController.RecoveryPassword);
router.post('/refresh-token', UserController.RefreshToken);

// transaction
router.post('/atm-transaction', verifyUser, UserController.AtmTransaction);

export default router;