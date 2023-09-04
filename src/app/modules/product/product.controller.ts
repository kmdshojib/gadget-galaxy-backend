import { NextFunction, Request, Response } from "express";
import { addProductToDB, getProductByIdFromDb, getProductFromDB } from "./product.service";
import { v2 as cloudinary } from 'cloudinary';

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = await req.body;
    // const product = await addProductToDB(data)
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const upoladRes = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        async (error: any, result: any) => {
            if (error) {
                console.error("Error uploading to Cloudinary:", error);
                return res.status(500).json({ error: 'Error uploading image' });
            } else {
                const imageUrl = result.secure_url;
                console.log("Image URL:", imageUrl);
            }
        },
    ).end(req.file.buffer);

    // if (product) {
    //     res.status(200).json({
    //         message: "Product added successfully"
    //     })
    // } else {
    //     res.status(404).json({
    //         message: "opps! Something went wrong! Please check your data!"
    //     })
    // }
}

export const getProducts = async (req: Request, res: Response) => {
    const products = await getProductFromDB()
    res.status(200).json({
        products
    })
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await getProductByIdFromDb(id)
    res.status(200).json({
        product
    })
}