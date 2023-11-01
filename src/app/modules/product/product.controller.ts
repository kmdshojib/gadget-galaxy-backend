import { NextFunction, Request, Response } from "express";
import { addOrderData, addProductToDB, deleteProductFromDB, getOrdersFromDB, getProductByCategoryfromDB, getProductByIdFromDb, getProductFromDB, getSearchformDB, getSellerProductsFromDb } from "./product.service";
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
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        const products = await getProductFromDB(page, pageSize);

        res.status(200).json({
            products,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await getProductByIdFromDb(id)
    res.status(200).json({
        product
    })
}
export const getProductByCategory = async (req: Request, res: Response) => {
    const category = req.params.category;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        let products:any;

        if (category === "all") {
            products = await getProductFromDB(page, pageSize);
        } else {
            products = await getProductByCategoryfromDB(category, page, pageSize);
        }

        res.status(200).json({
            products
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
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
// add jwt letter
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

// add jwt token
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
// add jwt letter
export const getSellerProducts = async (req: Request, res: Response) => {
    try {
        const sellerEmail = req.params.email
        const product = await getSellerProductsFromDb(sellerEmail)
        res.status(200).json(product)
    } catch (error) {
        throw new Error("Can't get produts");
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const product = await deleteProductFromDB(id);
        console.log(product)
        if (product?.acknowledged === true) {
            res.status(200).json({ data: { message: "Product deleted successfully" } })
        }
    } catch (error) {
        if (error) {
            res.status(500).json({ message: "Error deleting product" })
        }
    }
}