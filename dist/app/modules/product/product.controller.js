"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedProduct = exports.deleteProduct = exports.getSellerProducts = exports.getOrders = exports.makePostOrderRequest = exports.makePaymentRequest = exports.getSearch = exports.getProductByCategory = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
const imageUplopad_1 = require("../../function/imageUplopad");
const product_model_1 = require("./product.model");
const app_1 = require("../../../app");
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield req.body;
    if (!req.files) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const image1 = yield (0, imageUplopad_1.uploadImage)(req.files[0].buffer);
    const image2 = yield (0, imageUplopad_1.uploadImage)(req.files[1].buffer);
    const imageUrls = [image1, image2];
    data.images = imageUrls;
    const product = yield (0, product_service_1.addProductToDB)(data);
    if (product) {
        res.status(200).json({
            message: "Product added successfully"
        });
    }
    else {
        res.status(404).json({
            message: "opps! Something went wrong! Please check your data!"
        });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        const products = yield (0, product_service_1.getProductFromDB)(page, pageSize);
        res.status(200).json({
            products,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield (0, product_service_1.getProductByIdFromDb)(id);
    res.status(200).json({
        product
    });
});
exports.getProductById = getProductById;
const getProductByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    try {
        let products;
        if (category === "all") {
            products = yield (0, product_service_1.getProductFromDB)(page, pageSize);
        }
        else {
            products = yield (0, product_service_1.getProductByCategoryfromDB)(category, page, pageSize);
        }
        res.status(200).json({
            products
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getProductByCategory = getProductByCategory;
// search end point
const getSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    const searchItem = yield (0, product_service_1.getSearchformDB)(query, product_model_1.laptop);
    res.status(200).json({ searchItem });
});
exports.getSearch = getSearch;
const makePaymentRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paymentData = req.body;
    const price = paymentData.price * 100;
    const paymentIntent = yield app_1.stripe.paymentIntents.create({
        currency: "usd",
        amount: price,
        automatic_payment_methods: {
            enabled: true,
        }
    });
    res.status(200).json({
        clientSecret: paymentIntent.client_secret,
    });
});
exports.makePaymentRequest = makePaymentRequest;
// add jwt letter
const makePostOrderRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const orders = yield (0, product_service_1.addOrderData)(data);
        res.status(201).json(orders);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.makePostOrderRequest = makePostOrderRequest;
// add jwt token
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const product = yield (0, product_service_1.getOrdersFromDB)(email);
        res.status(200).send(product);
    }
    catch (error) {
        if (error) {
            throw new Error("Can't get orders");
        }
    }
});
exports.getOrders = getOrders;
// add jwt letter
const getSellerProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sellerEmail = req.params.email;
        const product = yield (0, product_service_1.getSellerProductsFromDb)(sellerEmail);
        res.status(200).json(product);
    }
    catch (error) {
        throw new Error("Can't get produts");
    }
});
exports.getSellerProducts = getSellerProducts;
// add jwt
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield (0, product_service_1.deleteProductFromDB)(id);
        console.log(product);
        if ((product === null || product === void 0 ? void 0 : product.acknowledged) === true) {
            res.status(200).json({ data: { message: "Product deleted successfully" } });
        }
    }
    catch (error) {
        if (error) {
            res.status(500).json({ message: "Error deleting product" });
        }
    }
});
exports.deleteProduct = deleteProduct;
const getFeaturedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield (0, product_service_1.getFeatuuredProductFromDb)();
        res.status(200).json({ product });
    }
    catch (error) {
        throw error;
    }
});
exports.getFeaturedProduct = getFeaturedProduct;
//# sourceMappingURL=product.controller.js.map