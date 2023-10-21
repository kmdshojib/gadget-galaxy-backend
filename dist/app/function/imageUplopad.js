"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadImage = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result.secure_url);
            }
        }).end(fileBuffer);
    });
};
exports.uploadImage = uploadImage;
//# sourceMappingURL=imageUplopad.js.map