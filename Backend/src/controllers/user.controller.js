import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import uploadToCloudinary  from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
//import multer from "multer";

const registerUser=asyncHandler(async (req,res)=>{
   //1) get user detail from frontend
    const {username,email,password,avtar,refreshToken}=req.body;




   //2) check validation(non-empty)
   if(
    [username,email,password].some((field)=>field?.trim()==="")
   ){
    throw new ApiError(400,"All fields are required");
   }


   //3) check user already registered or not(username or email)

    const existingUser=await User.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(existingUser)
    {
        throw new ApiError(409,"User already registered with this username or email");
    }


   //4) check for image

     const avtarlocalPath = req.file?.path;

     if(!avtarlocalPath)
     {
        throw new ApiError(400,"Avtar image is required");
     }


    //5) upload them on cloudinary
    const avtarImage=await uploadToCloudinary(avtarlocalPath);

    if(!avtarImage)
    {
        throw new ApiError(500,"Error uploading avtar image");
    }   


   //6) create user object -create entry in database

     const user = await User.create({
        username,
        email,
        password,
        avtar:avtarImage.url
     })


   //7) remove pass and refresh token field from response

    const createdUser = await User.findById(user._id).select("-password -refreshToken");


   //8) check for user creation

    if(!createdUser)
     {
        throw new ApiError(500,"User creation failed");
     }


   //9) return response

   return res.status(201).json(
    new ApiResponse(200,"User registered successfully",createdUser)
   )

})

export default registerUser