"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.laptop = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customerEmail: { type: String, required: true },
    price: { type: Number, required: true },
    product: [
        {
            id: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});
const laptopSchema = new mongoose_1.Schema({
    laptopName: { type: String, required: true },
    category: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    discountedPrice: { type: String },
    featured: { type: Boolean },
    images: { type: [], required: true }
});
laptopSchema.index({ laptopName: "text" }, { background: true });
const laptop = (0, mongoose_1.model)("laptop", laptopSchema);
exports.laptop = laptop;
const order = (0, mongoose_1.model)("order", orderSchema);
exports.order = order;
laptop.ensureIndexes();
//# sourceMappingURL=product.model.js.map