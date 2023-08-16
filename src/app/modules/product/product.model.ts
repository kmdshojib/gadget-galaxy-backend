import { Schema, model } from "mongoose";

export interface laptopInterface {
    laptopName: string;
    category: string;
    price: number;
    sellerEmail: string;
    thumbnailUrl: string;
    images: string[],
}

const laptopSchema = new Schema<laptopInterface>({
    laptopName: { type: String, required: true },
    category: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnailUrl: { type: String, required: true },
    // images: { type: [], required: true }
})

export const laptop = model("laptop", laptopSchema)