import mongoose, { Model } from 'mongoose'
import User from './User.model'
import Pay from './Payment.model'
import Post from './Post.model'
mongoose.Promise = global.Promise
const db ={
    user:Model,
    pay:Model,
    post:Model
}
db.user = User
db.pay = Pay
db.post = Post
export default db

