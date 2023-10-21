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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const userService_1 = require("./userService");
const userModel_1 = require("./userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const imageUplopad_1 = require("../../function/imageUplopad");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const imageUrl = yield (0, imageUplopad_1.uploadImage)(req.file.buffer);
        userData.imageUrl = imageUrl;
        const user = yield (0, userService_1.createUserToDatabase)(userData);
        if (user) {
            res.status(200).send({
                message: "User created successfully!",
            });
        }
        else {
            res.status(404).send({
                message: "Oops! Something went wrong!",
            });
        }
    }
    catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        res.status(500).json({ error: 'Error uploading image' });
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const authToken = process.env.AUTH_TOKEN;
    try {
        const user = yield userModel_1.userModel.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ error: "User not registered or invalid email address!" });
        }
        const matchPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!matchPassword) {
            return res.status(400).json({ error: "Please check your password!" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, authToken, {
            expiresIn: "6h",
        });
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                imageUrl: user.imageUrl
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=userController.js.map