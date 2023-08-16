import { Router } from "express"
import { createProduct, getProductById, getProducts } from "./product.controller";

const laptopRoute: any = Router();

laptopRoute.get("/get", getProducts);
laptopRoute.get("/getProductById/:id", getProductById);

laptopRoute.post("/add", createProduct);

export default laptopRoute;