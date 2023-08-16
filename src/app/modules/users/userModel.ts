import { Schema, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    userType: string;
}

const userSchema = new Schema<IUser>({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true }
})

export const userModel = model("user", userSchema)