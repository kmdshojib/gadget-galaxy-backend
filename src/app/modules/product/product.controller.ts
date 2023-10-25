import { NextFunction, Request, Response } from "express";
import { addOrderData, addProductToDB, getOrdersFromDB, getProductByCategoryfromDB, getProductByIdFromDb, getProductFromDB, getSearchformDB } from "./product.service";
import { v2 as cloudinary } from 'cloudinary';
import { uploadImage } from "../../function/imageUplopad";
import { OrderInterface, laptop } from "./product.model";
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
    const price = paymentData.price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: price,
        automatic_payment_methods: {
            enabled: true,
        }
    });


    res.status(200).json({
        clientSecret: paymentIntent.client_secret,
    });
};
export const makePostOrderRequest = async (req: Request, res: Response) => {
    try {
        const data: OrderInterface = req.body;
        const orders = await addOrderData(data);
        res.status(201).json(orders);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// 
export const getOrders = async (req: Request, res: Response) => {
    try {
        const email = req.params.email
        const product = await getOrdersFromDB(email);
        res.status(200).send(product)
    } catch (error) {
        if (error) {
            throw new Error("Can't get orders");
        }
    }
}