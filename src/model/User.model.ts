import {Schema} from 'mongoose'
import mongoose  from "mongoose";
import mongoosePagination from 'mongoose-paginate-v2'

const userSchema = new Schema ({
    Username:{
        type:String,
        unique:true 
    },
    Email:{
        type:String,
        // unique:true
    },
    Payment:{
        type:String,
       // unique:true 
    },
    Password:{
        type:String,
      //  unique:true 
    },
    FullName:{
        type:String,
       // unique:true 
    },
    Point:{
        type:Number,
       // unique:true 
    },
    Role:{
        type:String,
       // unique:true 
    },
    CreatedAt:{
        type:Date,
      //  unique:true 
    },
    UpdateAt:{
        type:Date,
     //   unique:true 
    },
    isLock:{
        type:Boolean,
        required:true
    }
})
userSchema.plugin(mongoosePagination)
export default mongoose.model("User", userSchema);