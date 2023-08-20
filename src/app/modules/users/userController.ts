import { NextFunction, Request, Response } from "express";
import { createUserToDatabase } from "./userService";
import { userModel } from "./userModel";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

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

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const authToken: any = process.env.AUTH_TOKEN
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: 'User not registered or invalid email address!' });
        }
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({ error: 'Please check your password!' });
        }
        const token = jwt.sign({ userId: user._id }, authToken, { expiresIn: '6h' });

        res.status(200).json({
            message: "User logged in successfully",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.userType,
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}