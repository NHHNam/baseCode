import {Schema} from 'mongoose'
import mongoose  from "mongoose";
const mongoosastic = require('mongoosastic')
import clientElasticsearch from '../config/elastic.connect';
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
paymentSchema.plugin(mongoosastic,{
  esClient:clientElasticsearch
})
export default mongoose.model("Payment", paymentSchema);
