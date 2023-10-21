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
const express_1 = require("express");
const categoriesModel_1 = require("./categoriesModel");
const categoriesRoute = (0, express_1.Router)();
const categories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield categoriesModel_1.CategoriesModel.find();
        res.status(200).json({ categories });
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
categoriesRoute.get("/categories", categories);
exports.default = categoriesRoute;
//# sourceMappingURL=categoriesRoute.js.map