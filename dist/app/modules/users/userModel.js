"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    role: { type: 'string', required: true },
    imageUrl: { type: 'string' },
});
exports.userModel = (0, mongoose_1.model)("user", userSchema);
//# sourceMappingURL=userModel.js.map