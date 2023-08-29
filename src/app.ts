import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import laptopRoute from './app/modules/product/product.route';
import userRoute from './app/modules/users/userRoute';
import multer from "multer"
import { v2 as cloudinary } from 'cloudinary';

const app = express();




app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/v1/laptop", laptopRoute);
app.use("/api/v1/user", userRoute);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImageToCloudinary = async (imageBuffer: any) => {
    try {
        const result = await cloudinary.uploader.upload(imageBuffer, {
            folder: 'users'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return { error: true, message: 'Error uploading to Cloudinary' };
    }
};
export default app;