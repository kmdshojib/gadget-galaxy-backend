import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadImage = (fileBuffer: Buffer): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error: any, result: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(fileBuffer);
    });
};