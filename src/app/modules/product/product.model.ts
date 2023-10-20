import { Schema, model } from "mongoose";

export interface laptopInterface {
    laptopName: string;
    category: string;
    price: number;
    quantity: number;
    sellerEmail: string;
    images: string[],
}

const laptopSchema = new Schema<laptopInterface>({
    laptopName: { type: String, required: true },
    category: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [], required: true }
})
laptopSchema.index({ laptopName: "text" })
const laptop = model("laptop", laptopSchema)
laptop.ensureIndexes();
export { laptop }
