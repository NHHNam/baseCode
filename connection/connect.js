const { mode } = require("crypto-js");
const mongoose = require("mongoose");
const redis = require("redis");
const client = redis.createClient();
const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const http = require('http').createServer(app);

mongoose.set('strictQuery', false);
//Connect Redis
client.on("connect", function(error) {
    console.log("Connected Redis!!");
});

client.on("error", function(error) {
    console.log("Error");
});

//Connect MongoDBD
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log("Connected MongoDB");
});