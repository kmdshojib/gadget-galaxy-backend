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
exports.getSearch = exports.getProductByCategory = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const product_service_1 = require("./product.service");
const imageUplopad_1 = require("../../function/imageUplopad");
const product_model_1 = require("./product.model");
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
    const products = yield (0, product_service_1.getProductFromDB)();
    res.status(200).json({
        products
    });
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
    const products = yield (0, product_service_1.getProductByCategoryfromDB)(category);
    res.status(200).json({
        products
    });
});
exports.getProductByCategory = getProductByCategory;
// search end point
const getSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    const searchItem = yield (0, product_service_1.getSearchformDB)(query, product_model_1.laptop);
    res.status(200).json({ searchItem });
});
exports.getSearch = getSearch;
//# sourceMappingURL=product.controller.js.map