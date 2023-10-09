const express = require('express'); // Import swaggerJSDoc
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookiesParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const paymentRoute = require("./routes/payment");
const postRoute = require('./routes/post');
const chatRoute = require("./routes/chat");
const connect = require("./connection/connect");
const swaggerJSDoc = require('swagger-jsdoc');
const options = require("./swagger/configSwagger");
const app = express();
//socket
const http = require('http').createServer(app);


dotenv.config();

//Use swagger
const specs = swaggerJSDoc(options);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(cookiesParser());
app.use(express.json());

//Route auth
app.use("/v1/auth", authRoute);

//Route  user
app.use("/v1/user", userRoute);

//Route payment
app.use("/v1/payment", paymentRoute);

//Route post
app.use("/v1/post", postRoute);

//Route chat
app.use("/chat", chatRoute);
app.use(express.static(__dirname + '/socket'))


//Socket 
const io = require('socket.io')(http)
io.on('connection', (socket) => {
    console.log("Connected")
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

const PORT = process.env.PORT || 4000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});