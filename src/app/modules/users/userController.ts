import { NextFunction, Request, Response } from "express";
import { createUserToDatabase } from "./userService";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;

    const user = await createUserToDatabase(userData);

    if (user) {
        res.status(200).send({
            message: "User created successfully!"
        })
    } else {
        res.status(404).send({
            message: "Opps! Something went wrong!"
        });
    }
}