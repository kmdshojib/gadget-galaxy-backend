import { Router } from "express"
import {
    createProduct,
    deleteProduct,
    getOrders,
    getProductByCategory,
    getProductById,
    getProducts,
    getSearch,
    getSellerProducts,
    makePaymentRequest,
    makePostOrderRequest
} from "./product.controller";
import multer from "multer";
import { storage } from "../../../app";

const laptopRoute: any = Router();

const uplaod = multer({ storage: storage })

laptopRoute.get("/get", getProducts);
laptopRoute.get("/getProductById/:id", getProductById);
laptopRoute.get("/getproductByCategory/:category", getProductByCategory);
laptopRoute.get("/search", getSearch);
laptopRoute.post("/payment", makePaymentRequest);
laptopRoute.post("/postorders", makePostOrderRequest);
laptopRoute.get("/orders/:email", getOrders);
laptopRoute.get("/seller_products/:email", getSellerProducts)
laptopRoute.delete("/delete/:id", deleteProduct)
laptopRoute.post("/add", uplaod.array("image", 2), createProduct);
export default laptopRoute;