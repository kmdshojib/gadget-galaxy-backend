import { Router } from "express"
import { createProduct, getProductById, getProducts } from "./product.controller";
import multer from "multer";
import { storage } from "../../../app";

const laptopRoute: any = Router();

const uplaod = multer({ storage: storage })

laptopRoute.get("/get", getProducts);
laptopRoute.get("/getProductById/:id", getProductById);

laptopRoute.post("/add", uplaod.array("image", 2), createProduct);

export default laptopRoute;