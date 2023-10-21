"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.laptop = void 0;
const mongoose_1 = require("mongoose");
const laptopSchema = new mongoose_1.Schema({
    laptopName: { type: String, required: true },
    category: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [], required: true }
});
laptopSchema.index({ laptopName: "text" });
const laptop = (0, mongoose_1.model)("laptop", laptopSchema);
exports.laptop = laptop;
laptop.ensureIndexes();
//# sourceMappingURL=product.model.js.map