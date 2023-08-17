import { Router } from "express"
import { createUser } from "./userController";

const userRoute: any = Router()

userRoute.post("/register", createUser)

export default userRoute;