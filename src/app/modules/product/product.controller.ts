import { NextFunction, Request, Response } from "express";
import { addProductToDB, getProductByCategoryfromDB, getProductByIdFromDb, getProductFromDB, getSearchformDB } from "./product.service";
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from "../../function/imageUplopad";
import { laptop } from "./product.model";
import { stripe } from "../../../app";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const data = await req.body;

    if (!req.files) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const image1 = await uploadImage(req.files[0].buffer)
    const image2 = await uploadImage(req.files[1].buffer)

    const imageUrls: string[] = [image1, image2]
    data.images = imageUrls
    const product = await addProductToDB(data)
    if (product) {
        res.status(200).json({
            message: "Product added successfully"
        })
    } else {
        res.status(404).json({
            message: "opps! Something went wrong! Please check your data!"
        })
    }
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
export const getProductByCategory = async (req: Request, res: Response) => {
    const category = req.params.category
    const products = await getProductByCategoryfromDB(category);
    res.status(200).json({
        products
    })
}
// search end point

export const getSearch = async (req: Request, res: Response) => {
    const query: any = req.query.q;
    const searchItem = await getSearchformDB(query, laptop);
    res.status(200).json({ searchItem });
}

export const makePaymentRequest = async (req: Request, res: Response) => {
    const paymentData = req.body;
    const price = paymentData.price;
    const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: price,
        "payment_method_types": [
            "card"
        ]
    })
    res.send({
        message: "Payment Successful",
        clientSecret: paymentIntent.client_secret
    })
}