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
exports.getSearchformDB = exports.getProductByCategoryfromDB = exports.getProductByIdFromDb = exports.getProductFromDB = exports.addProductToDB = void 0;
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
//# sourceMappingURL=product.service.js.map