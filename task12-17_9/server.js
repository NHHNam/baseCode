import dotenv from 'dotenv';
dotenv.config();

import server from './src/app.js';

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`The server is running on PORT = ${PORT}`);
});
