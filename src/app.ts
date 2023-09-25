import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import laptopRoute from './app/modules/product/product.route';
import userRoute from './app/modules/users/userRoute';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import categoriesRoute from './app/modules/product-categories/categoriesRoute';

const app = express();

app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/v1/laptop", laptopRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1", categoriesRoute);


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const storage = multer.memoryStorage();

export default app;