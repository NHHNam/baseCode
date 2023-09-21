const express = require('express'); // Import swaggerJSDoc
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookiesParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const paymentRoute = require("./routes/payment");
const postRoute = require('./routes/post');
const connect = require("./connection/connect");
const swaggerJSDoc = require('swagger-jsdoc');
const options = require("./swagger/configSwagger");


dotenv.config();
const app = express();

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


app.listen(8000, () => {
    console.log("Server is now listening at port 8000");
});