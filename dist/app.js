"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.stripe = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const product_route_1 = __importDefault(require("./app/modules/product/product.route"));
const userRoute_1 = __importDefault(require("./app/modules/users/userRoute"));
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const categoriesRoute_1 = __importDefault(require("./app/modules/product-categories/categoriesRoute"));
const stripe_1 = __importDefault(require("stripe"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
dotenv_1.default.config();
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
const secret = process.env.STRIPE_SECRET;
exports.stripe = new stripe_1.default(secret || "", {
    apiVersion: "2023-10-16",
});
app.get("/", (req, res) => {
    res.send("Server has been initialized!");
});
app.use("/api/v1/laptop", product_route_1.default);
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1", categoriesRoute_1.default);
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
exports.storage = multer_1.default.memoryStorage();
exports.default = app;
//# sourceMappingURL=app.js.map