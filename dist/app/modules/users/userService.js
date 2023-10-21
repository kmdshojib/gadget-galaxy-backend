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
exports.createUserToDatabase = void 0;
const userModel_1 = require("./userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserToDatabase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, imageUrl } = payload;
    const encryptedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = new userModel_1.userModel({
        name: name,
        email: email,
        password: encryptedPassword,
        role: role,
        imageUrl: imageUrl
    });
    return newUser.save();
});
exports.createUserToDatabase = createUserToDatabase;
//# sourceMappingURL=userService.js.map