import { Router } from "express"
import { createProduct, getProductByCategory, getProductById, getProducts, getSearch } from "./product.controller";
import multer from "multer";
import { storage } from "../../../app";

const laptopRoute: any = Router();

const uplaod = multer({ storage: storage })

laptopRoute.get("/get", getProducts);
laptopRoute.get("/getProductById/:id", getProductById);
laptopRoute.get("/getproductByCategory/:category", getProductByCategory);
laptopRoute.get("/search", getSearch);
laptopRoute.post("/add", uplaod.array("image", 2), createProduct);
export default laptopRoute;