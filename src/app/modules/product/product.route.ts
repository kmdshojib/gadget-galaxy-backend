import { Router } from "express"
import {
    createProduct,
    getOrders,
    getProductByCategory,
    getProductById,
    getProducts,
    getSearch,
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
laptopRoute.post("/add", uplaod.array("image", 2), createProduct);
export default laptopRoute;