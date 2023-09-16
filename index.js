const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();
const app = express();

app.listen(8000, () => {
  console.log("Server is running...");
});

const url =
  "mongodb+srv://canh01:canh01@cluster0.9bckgd3.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("Connect to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Lỗi kết nối:", error);
//   });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
