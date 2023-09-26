import mongoose  from "mongoose";
require("dotenv").config()
const uri = "mongodb+srv://TienAnh:1qkvvj3pnd2LyRHU@mern.ocobt.mongodb.net/";
const connectDB = ()=>{
    mongoose.connect(uri).then(()=>console.log("connect db successfully")).catch((err:Error)=>{console.log(err)});
}
export default connectDB