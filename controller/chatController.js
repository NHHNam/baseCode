const path = require('path');
const logEvent = require("../helper/logEvent");
const chatController = {
    chat: async(req, res) => {
        try {
            const indexPath = path.join(__dirname, '..', 'view', 'index.html');
            res.sendFile(indexPath);
        } catch (error) {
            console.error(error);
            logEvent(`${req.url}-------${req.method}-------"Error Chat Real Time"`);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = chatController;