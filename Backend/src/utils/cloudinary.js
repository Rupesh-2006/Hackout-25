import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    }
);


const uploadToCloudinary = async (localFilePath)=>
{
    try{

        if(!localFilePath) return null;

        //upload file on cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,
        {
            resource_type: "auto"
        });

        //file has been uploaded successfully
        console.log("File uploaded to Cloudinary successfully:", response.url);
        return response;
    }catch(error){
        //remove the locally saved file as upload file operation got failed
        fs.unlinkSync(localFilePath);
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
}


export default uploadToCloudinary;