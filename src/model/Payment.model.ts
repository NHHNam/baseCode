import {Schema} from 'mongoose'
import mongoose  from "mongoose";
const paymentSchema = new Schema ({
    UserId:{
      type:Schema.Types.ObjectId,
      ref:"User" 
    },
    CardId:{
        type:String,
        unique:true 
    },
    FullName:{
        type:String,
       // unique:true 
    },
    NameCard:{
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
    } 
})
export default mongoose.model("Payment", paymentSchema);
