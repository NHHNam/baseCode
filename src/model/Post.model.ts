import {Schema} from 'mongoose'
import mongoose  from "mongoose";
const mongoosastic = require('mongoosastic')
import clientElasticsearch from '../config/elastic.connect';
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
postSchema.plugin(mongoosastic,{
  esClient:clientElasticsearch
})
export default mongoose.model("Post", postSchema);