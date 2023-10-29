import { Response, Request } from "express";
import Post from "../model/Post.model";
import db from "../model/db";
import uploadFileToCloudinary from '../util/cloudinary.util'
import redisUtil from "../util/redis.util";
import UserUtils from "../util/user.util";
import Payment from "../model/Payment.model"
import ElasticSearch from "../util/elasticsearch.util";

export default class AdminController {
    static handleAddPost = async(
        req:Request,
        res:Response
    )=>{
        if (req.body.user.role != "Admin") {
            return res.status(403).json({msg:"Only Admin"})
        }
        try {
            const {
                UserId,
                Description,
                Title,
            } = req.body
            let newPost = new Post({
                UserId,
                Description,
                Title,
                CreatedAt: new Date(),
                UpdateAt: new Date(),
            });
            const result = await newPost.save()
            await ElasticSearch.integrateIndex(result,'pay')
            return res.status(200).json({Post:result})
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    };
    static handleUpdatePost = async(
        req:Request,
        res:Response
    )=>{
        if (req.body.user.role != "Admin") {
            return res.status(403).json({msg:"Only Admin"})
        }
        try {
            const {
                UserId ,
                Description,
                Title,
            } = req.body
          
        const query = {UserId}
        const updateInfo ={
            UserId ,
            Description,
            Title,
            UpdateAt: new Date()
        }
        const result = await db.post.findOneAndUpdate(query,updateInfo)
        await ElasticSearch.integrateIndex(result,'pay')
        return res.status(200).json({msg:result})
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    };
    static handleRefreshPassword = async (
        req:Request,
        res:Response
    )=>{
        try {
            const query = {
                _id:req.body.id
            }
            const user = await db.user.findOne(query)
            let password = await UserUtils.refreshPassword(user.Email)
            const newPassword = await UserUtils.hashpassword(password)
            user.Password=newPassword
            user.UpdateAt = new Date()
            const result = await user.save()
            await ElasticSearch.integrateIndex(result,'user')
            return res.status(200).json({msg:result})
        } catch(err) {
            console.log(err)
            return res.status(403).json({msg:err})
        }
    }
    static handleDeletePost = async (
        req:Request,
        res:Response
    )=>{
        try {
            const {
                _id
            } = req.body
            const query = {_id}
            await db.post.findOneAndDelete(query)
            const result  = await db.post.find()
            return res.status(200).json({msg:result})
        } catch(err) {
            return res.status(403).json({msg:"only Admin"})
        }
        //return res.status(200).json({msg:"delete post"})
    }
    static handleLockUser = async(
        req:Request,
        res:Response
    ) =>{
        try {
            const {
                userID
            } = req.body
            let user = await db.user.findByIdAndUpdate(userID,{isLock:true})
            await ElasticSearch.integrateIndex(user,'user')

            await redisUtil.del(req.body.user.id)
            return res.status(400).json({msg:user})
        } catch (err) {
            return res.status(403).json({msg:err})
        }
    }
    static handAddThumbnail= async(
        req:Request,
        res:Response
    )=>{
        try {
            const {
                file
            }=req
            console.log(file)
            const  {
                postid
            } = req.body
            const secure_url = await uploadFileToCloudinary(file?.path)
            const query = {
                _id:postid
            }
            const updateInfo = {
                Thumbnail:secure_url
            }
            const result =  await db.post.findByIdAndUpdate(query,updateInfo).lean()
            await ElasticSearch.integrateIndex(result,'post')

            return res.status(200).json({msg:result})
        } catch(err){
            return res.status(403).json({err})
        }
    }
    static handleAddPayment = async(
        req:Request,
        res:Response
    )=>{
        try {
            const {
                FullName,
                UserId,
                CardId,
                NameCard,
            } = req.body
            let newPaymnet = new Payment({
                UserId,
                CardId ,
                FullName,
                NameCard,
                CreatedAt: new Date(),
                UpdateAt: new Date(),
            });
            const result = await newPaymnet.save()
            await ElasticSearch.integrateIndex(result,'pay')
            
            return res.status(200).json({Payment:result})
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    };
    static handleUpdatePayment = async(
        req:Request,
        res:Response
    )=>{
        try {
            const {
                CardId ,
                FullName,
                NameCard,
            } = req.body
        const query = {CardId}
        const updateInfo ={
            FullName,
            NameCard,
            UpdateAt: new Date()
        }
        const result = await db.pay.findOneAndUpdate(query,updateInfo)
        await ElasticSearch.integrateIndex(result,'pay')
        return res.status(200).json({msg:result})
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    }
    static handleDeletePayment = async (
        req:Request,
        res:Response
    )=>{
        try {
            const {
                _id
            } = req.body
            const query = {_id}
            let result =  await db.pay.findOneAndDelete(query)
            return res.status(200).json({msg:result})
        } catch(err) {
            return res.status(403).json({msg:"only Admin"})
        }
        //return res.status(200).json({msg:"delete post"})
    }
    static handleUpdateRole = async (
        req: Request,
        res: Response
    )=>{
        try {
            const user = req.body.user
        const {
            Username,
            Role
        } = req.body
        const query = {Username}
        const updateInfo ={
            Role,
            UpdateAt: new Date()
        }
        const result = await db.user.findOneAndUpdate(query,updateInfo)
        await ElasticSearch.integrateIndex(result,'user')
        return res.status(200).json({msg:result})
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    }
}