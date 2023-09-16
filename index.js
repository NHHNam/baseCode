const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc'); // Import swaggerJSDoc
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookiesParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const paymentRoute = require("./routes/payment");
const postRoute = require('./routes/post');

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("Connected DB");
});

const options = {
    definition: {
        //openapi: '3.0.0',
        info: {
            title: 'API_BE_AIKING',
            version: '1.0.0',
        }

    },
    apis: ['./swagger.js'],
};

const specs = swaggerJSDoc(options);

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(cookiesParser());
app.use(express.json());

// route
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/payment", paymentRoute);
app.use("/v1/post", postRoute);

app.listen(8000, () => {
    console.log("Server is now listening at port 8000");
});