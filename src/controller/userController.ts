import { Response, Request } from "express";
import User from "../model/User.model";
import Payment from "../model/Payment.model"
import db from "../model/db";
import UserUtils from "../util/user.util";
import JwtTokenUtils from "../util/jwt.util";
import redisUtil from "../util/redis.util";
export default class UserController {
    static testAuth = async(
        req: Request,
        res: Response
    ) =>{
        try {
            let result = req.body.user
            return res.status(200).json({ msg:result});
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    }
    static handleLogout = async(
        req: Request,
        res: Response
    )=>{
        try {
            delete req.headers['authorization'];
            await redisUtil.del(req.body.user.id)
            return res.status(200).json({msg:"You log out"})
        } catch(err) {
            return res.status(200).json({msg:err})
        }    
    }
    static getUser = async (
        req: Request,
        res: Response
    ) => {
        try {
            let result = await db.user.find()
            return res.status(200).json({ msg:result});
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    };
    static handleLogin = async (
        req: Request,
        res: Response
    )=>{
        try {
            const {UserName,Password}=req.body
            const user = await db.user.findOne({Username:UserName})
            if (user == null) {
                return res.status(403).json({msg:"This account has not existed"})
            }
            const isUserValid = await UserUtils.comparePassword(Password,user.Password)
            if (isUserValid) {
                let token = await JwtTokenUtils.generateToken(user.Username,user.Role,user._id.toString(),user.isLock)
                let refreshToken = await JwtTokenUtils.generateRefreshToken(user.Username,user.Role,user._id.toString())
                return res.status(200).json({token,refreshToken})
            } else {
                return res.status(403).json({msg:"wrong password"})
            }
        } catch(err) {
            return res.status(403).json({msg:err})
        } 
    };
    static handleSignIn = async(
        req: Request,
        res: Response
    ) =>{
        try {
            const {
                Username ,
                Email,
                Payment,
                Password,
                FullName,
                Point,
                Role
            } = req.body
            let check = await UserUtils.isUserExisted(Username).catch(err=>{return res.status(403).json({msg : err})})
            if (check) {
                return res.status(201).json({msg:"Username has existed"})
            }
            const password = await UserUtils.hashpassword(Password)
            let newUser = new User({
                Username ,
                Email,
                Payment ,
                Password : password,
                FullName,
                Point:parseInt(Point),
                Role,
                CreatedAt: new Date(),
                UpdateAt: new Date(),
                isLock:false
            });
            await newUser.save()
            let token = await JwtTokenUtils.generateToken(Username,Role,newUser._id.toString(),false)
            let refreshToken = await JwtTokenUtils.generateRefreshToken(Username,Role,newUser._id.toString())
            return res.status(200).json({token,refreshToken})
        } catch(err) {
            console.log(err)
            return res.status(403).json({msg:err})
        }
            
    };
    static handleUpdateUser = async (
        req: Request,
        res: Response
    )=>{
        try {
            const user = req.body.user
        const {
            Username,
            Payment,
            Email,
            // Password,
            FullName,
            Point
        } = req.body
        if (user != null && user.username != Username) {
            return res.status(403).json({msg:"You cannot update this user account"})
        }
        const query = {Username}
        const updateInfo ={
           // Username ,
            Payment ,
            Email,
            // Password,
            FullName,
            Point:parseInt(Point),
            UpdateAt: new Date()
        }
        const result = await db.user.findOneAndUpdate(query,updateInfo)
        return res.status(200).json({msg:result})
        } catch(err) {
            return res.status(200).json({msg:err})
        }
        
    };
    static handleAddPayment = async(
        req:Request,
        res:Response
    )=>{
        try {
            const FullName = req.body.user.username
            const UserId = req.body.user.id
            const {
                CardId,
                //FullName,
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
            const FullName = req.body.user.username
            const UserId = req.body.user.id
            const {
                CardId ,
                NameCard,
            } = req.body
        const query = {UserId}
        const updateInfo ={
            FullName,
            NameCard,
            UpdateAt: new Date()
        }
        const result = await db.pay.findOneAndUpdate(query,updateInfo)
        return res.status(200).json({msg:result})
        } catch(err) {
            return res.status(200).json({msg:err})
        }
    };
    static handleSearchPayment = async(
        req:Request,
        res:Response
    )=>{
        try {
            let {
                DateFrom,
                DateTo
            } = req.body
            DateFrom = DateFrom == null ? new Date() : new Date(DateFrom)
            DateTo = DateTo == null ? new Date() : new Date(DateTo)
            const UserId = req.body.user.id
            const query = {
                UserId,
                UpdateAt:{
                    $gte:DateTo,
                    $lte:DateFrom
                }
            }
            let result = await db.pay.find(query)
            let test = await db.pay.find()
            return res.status(200).json({msg:result,test})
        } catch(err) {
            return res.status(403).json({msg:err})
        }
    };
   
    static handleChangePassword =async(
        req:Request,
        res:Response
    ) =>{
        try {
            const {
                oldPassword,
                newPassword
            } = req.body
            const userName = req.body.user.username
            const user = await db.user.findOne({Username:userName})
            if (user == null) {
                return res.status(403).json({msg:"This account has not existed"})
            }
            const isUserValid = await UserUtils.comparePassword(oldPassword,user.Password)
            if (isUserValid) {
                const hashNewPassword = await UserUtils.hashpassword(newPassword)
                user.Password = hashNewPassword
                await db.user.findOneAndUpdate({Username:userName},{Password:hashNewPassword})
                return res.status(200).json({msg:"Change Password successfully"})
            } else {
                return res.status(403).json({msg:"Password or username is wrong"})
            }
        } catch(err) {
            return res.status(403).json({msg:err})
        }
    };
    static handleSendOpt = async(
        req:Request,
        res:Response
    ) =>{
        try {
            const name = req.body.userName
            const user = await db.user.findOne({Username:name})
            const result =  await UserUtils.sendOpt(user.Email)
            return res.status(200).json({msg:result})
        } catch(err) {
            console.log(err)
            return res.status(403).json({err:err})
        }
    }
    static handleGetDocument = async(
        req:Request,
        res:Response
    ) =>{
        try {
            let  {
                document,
                page
            } = req.body
            let result = await UserUtils.getDocument(document,page)
            return res.status(200).json({result})
        } catch(err) {
            console.log(err)
            return res.status(403).json({err})
        }
    }
    static handleForgetPassword = async(
        req:Request,
        res:Response
    ) =>{
        try {
            const {
                opt,newPassword,userName
            } = req.body
            let temp = await db.user.findOne({Username:userName})
            const isValid = await UserUtils.isOptValid(opt,temp.Email)
            if (isValid) {
                const hashNewPassword = await UserUtils.hashpassword(newPassword)
                const result =await db.user.findOneAndUpdate({Username:userName},{Password:hashNewPassword})
                return res.status(200).json({msg:result})
            }else {
                return res.status(403).json({msg:"opt is invalid"})
            }
        } catch(err) {
            console.log(err
                )
            return res.status(403).json({
                msg:err
            })
        }
    };
    static handleSearchService = async(
        req:Request,
        res:Response
    )=>{
        try {
            const {
                query,
                property,
            } = req.body
            let result = await UserUtils.searchService(property,query)
            return res.status(200).json({result})
        } catch(err) {
            console.log(err)
            return res.status(403).json({err})
        }
    }
}