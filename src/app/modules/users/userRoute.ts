import { Router } from "express"
import { createUser, loginUser } from "./userController";
import multer from "multer";
// import { upload } from "../../../app";

const userRoute: any = Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRoute.post("/register", upload.single("image"), createUser)
userRoute.post("/login", loginUser)

export default userRoute;