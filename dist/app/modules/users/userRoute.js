"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("./userController");
const multer_1 = __importDefault(require("multer"));
const app_1 = require("../../../app");
const userRoute = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: app_1.storage });
userRoute.post("/register", upload.single("image"), userController_1.createUser);
userRoute.post("/login", userController_1.loginUser);
exports.default = userRoute;
//# sourceMappingURL=userRoute.js.map