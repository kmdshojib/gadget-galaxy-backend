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
exports.deleteProductFromDB = exports.getSellerProductsFromDb = exports.getOrdersFromDB = exports.addOrderData = exports.getSearchformDB = exports.getProductByCategoryfromDB = exports.getProductByIdFromDb = exports.getProductFromDB = exports.addProductToDB = void 0;
const product_model_1 = require("./product.model");
const addProductToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const addProduct = new product_model_1.laptop(payload);
    yield addProduct.save();
    return addProduct;
});
exports.addProductToDB = addProductToDB;
const getProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = product_model_1.laptop.find();
    return products;
});
exports.getProductFromDB = getProductFromDB;
const getProductByIdFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.laptop.findOne({ _id });
    return product;
});
exports.getProductByIdFromDb = getProductByIdFromDb;
const getProductByCategoryfromDB = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.laptop.find({ category: category }).exec();
    return products;
});
exports.getProductByCategoryfromDB = getProductByCategoryfromDB;
const getSearchformDB = (query, laptopModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = yield laptopModel.find({ $text: { $search: query } });
        return search;
    }
    catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
});
exports.getSearchformDB = getSearchformDB;
const addOrderData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const orderedProduct = new product_model_1.order(payload);
    for (const product of payload.product) {
        const { id, quantity } = product;
        const data = yield product_model_1.laptop.findOne({ _id: id });
        if (data) {
            data.quantity -= quantity;
            yield data.save();
        }
        else {
            console.error(`Laptop with ID ${id} not found.`);
        }
    }
    yield orderedProduct.save();
    return orderedProduct;
});
exports.addOrderData = addOrderData;
const getOrdersFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_model_1.order.find({ customerEmail: payload });
        let laptops = [];
        for (const order of product) {
            for (const item of order.product) {
                const laptop = yield (0, exports.getProductByIdFromDb)(item.id);
                if (laptop) {
                    laptops.push(laptop);
                }
            }
        }
        return {
            order: product,
            product: laptops
        };
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Something went wrong");
    }
});
exports.getOrdersFromDB = getOrdersFromDB;
const getSellerProductsFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = product_model_1.laptop.find({ sellerEmail: payload });
        return product;
    }
    catch (err) {
        console.log("something went wrong", err);
    }
});
exports.getSellerProductsFromDb = getSellerProductsFromDb;
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = product_model_1.laptop.deleteOne({ _id: id });
        return product;
    }
    catch (error) {
        if (error) {
            throw new Error("Can't delete product");
        }
    }
});
exports.deleteProductFromDB = deleteProductFromDB;
//# sourceMappingURL=product.service.js.map