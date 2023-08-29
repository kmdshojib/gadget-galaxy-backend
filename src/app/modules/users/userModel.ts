import { Schema, model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    imageUrl: string | {
        error: boolean;
        message: string;
    };
}

const userSchema = new Schema<IUser>({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    role: { type: 'string', required: true },
    imageUrl: { type: 'string' },
})

export const userModel = model("user", userSchema)