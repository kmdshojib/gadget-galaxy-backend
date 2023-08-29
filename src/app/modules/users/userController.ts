import { NextFunction, Request, Response } from "express";
import { createUserToDatabase } from "./userService";
import { userModel } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadImageToCloudinary } from "../../../app";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, role, imageUrl } = req.body;
  // console.log({ imageUrl })
  try {
    // Check if an image is provided
    let imageUrlNew: any
    if (imageUrl) {
      const imageBuffer = Buffer.from(imageUrl.replace(/^data:image\/\w+;base64,/, ''), 'base64');      
      const uploadResult = await uploadImageToCloudinary(imageBuffer);

      if (!uploadResult) {
        return res.status(500).json({ error: "Error uploading image" });
      }

      imageUrlNew = uploadResult;
    }
  } catch (err) {
    console.log(err);
  }
  // const user = await createUserToDatabase(userData);

  // if (user) {
  //   res.status(200).send({
  //     message: "User created successfully!",
  //   });
  // } else {
  //   res.status(404).send({
  //     message: "Opps! Something went wrong!",
  //   });
  // }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const authToken: any = process.env.AUTH_TOKEN;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User not registered or invalid email address!" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({ error: "Please check your password!" });
    }
    const token = jwt.sign({ userId: user._id }, authToken, {
      expiresIn: "6h",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
