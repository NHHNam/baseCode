import express from 'express';

// import controller
import SitesController from '../controllers/sites.controller.js';
const router = express.Router();

router.get('/chat-real-time-socket.io', SitesController.ChatRealTimeSocketIo);

export default router;
