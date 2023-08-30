import { NextFunction, Request, Response } from "express";
import { createUserToDatabase } from "./userService";
import { userModel } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const uploadResponse = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      async (error: any, result: any) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          return res.status(500).json({ error: 'Error uploading image' });
        } else {
          const imageUrl = result.secure_url;
          userData.imageUrl = imageUrl;

          const user = await createUserToDatabase(userData);

          if (user) {
            res.status(200).send({
              message: "User created successfully!",
            });
          } else {
            res.status(404).send({
              message: "Oops! Something went wrong!",
            });
          }
        }
      }
    ).end(req.file.buffer);

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: 'Error uploading image' });
  }
};


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