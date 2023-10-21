"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModel = void 0;
const mongoose_1 = require("mongoose");
const categoriesSchema = new mongoose_1.Schema({
    categories: [{ type: String, required: true }],
});
exports.CategoriesModel = (0, mongoose_1.model)("categories", categoriesSchema);
//# sourceMappingURL=categoriesModel.js.map