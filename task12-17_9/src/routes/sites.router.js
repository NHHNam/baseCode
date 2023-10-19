import express from 'express';

// import controller
import SitesController from '../controllers/sites.controller.js';
import { verifyUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/chat-real-time-socket.io', verifyUser, SitesController.ChatRealTimeSocketIo);
router.post('/room', SitesController.Room);
router.get('/view/login', SitesController.LoginView);

export default router;
