const path = require('path');
const chatController = {
    chat: async(req, res) => {
        try {
            const indexPath = path.join(__dirname, '..', 'view', 'index.html');
            res.sendFile(indexPath);
            console.log(sendMessage);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = chatController;