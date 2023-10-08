import WebSocket from 'ws';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { wss, io } from '../app.js';

const clients = new Map();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GenerateClientId = () => {
    return Date.now();
};
class SitesController {
    ChatRealTimeSocketIo(req, res) {
        try {
            const filePath = join(__dirname, '..', 'views', 'chatRealTimeSocketIo.html');
            res.sendFile(filePath);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new SitesController();
