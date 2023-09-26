import {Schema} from 'mongoose'
import mongoose  from "mongoose";
const postSchema = new Schema ({
    UserId:{
        type:String,
        unique:true 
    },
    Description:{
        type:String,
       // unique:true 
    },
    Title:{
        type:String,
      //  unique:true 
    },
    CreatedAt:{
        type:Date,
      //  unique:true 
    },
    UpdateAt:{
        type:Date,
     //   unique:true 
    },
    Thumbnail:{
      type:String
    }
})
export default mongoose.model("Post", postSchema);