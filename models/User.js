import { User } from "@clerk/nextjs/dist/types/server";
import mongoose from "mongoose";
const userScema = new mongoose.Schema({
    _id  : {type : String , required : true } ,
    name  : {type : String , required : true } ,
    email  : {type : String , required : true , unique : true } ,
    imageUrl : {type : String , required : true },
    cartItems : {type : Object , default : {} }
}  ,{minimize :false})
const user = mongoose.models.user ||  mongoose.model('user' , userScema)

export default User  