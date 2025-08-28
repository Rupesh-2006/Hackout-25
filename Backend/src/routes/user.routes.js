import { Router } from "express";
import registerUser from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router=Router()

router.route("/register").post(
    upload.single("avtar"),   // avtar naam ka field hai frontend se jo image bhej raha hai
    registerUser)                                                

export default router