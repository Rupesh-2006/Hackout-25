import Mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema=new Mongoose.Schema({
    username:{
        type:String,
        required:true,
        index:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    avtar:{
      type:String   //cloudinary url
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String
    }
},{timestamps:true});



userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
});


userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
};




export const User=Mongoose.model("User",userSchema);