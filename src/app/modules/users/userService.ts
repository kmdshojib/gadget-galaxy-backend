import { IUser, userModel } from "./userModel"
import bcrypt from 'bcrypt';


export const createUserToDatabase = async (payload: IUser): Promise<IUser> => {
    const { name, email, password, role, imageUrl } = payload

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = new userModel({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
        imageUrl: imageUrl
    })
    return newUser.save()
}

