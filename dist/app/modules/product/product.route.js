"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const multer_1 = __importDefault(require("multer"));
const app_1 = require("../../../app");
const laptopRoute = (0, express_1.Router)();
const uplaod = (0, multer_1.default)({ storage: app_1.storage });
laptopRoute.get("/get", product_controller_1.getProducts);
laptopRoute.get("/getProductById/:id", product_controller_1.getProductById);
laptopRoute.get("/getproductByCategory/:category", product_controller_1.getProductByCategory);
laptopRoute.get("/search", product_controller_1.getSearch);
laptopRoute.post("/payment", product_controller_1.makePaymentRequest);
laptopRoute.post("/postorders", product_controller_1.makePostOrderRequest);
laptopRoute.get("/orders/:email", product_controller_1.getOrders);
laptopRoute.post("/add", uplaod.array("image", 2), product_controller_1.createProduct);
exports.default = laptopRoute;
//# sourceMappingURL=product.route.js.map