import { Document, Schema, model } from "mongoose";

export interface laptopInterface {
    laptopName: string;
    category: string;
    price: number;
    quantity: number;
    sellerEmail: string;
    images: string[],
}
interface Product {
    id: string;
    quantity: number;
}
export interface OrderInterface extends Document {
    customerEmail: string;
    price: number;
    product: Product[];
}

const orderSchema = new Schema<OrderInterface>({
    customerEmail: { type: String, required: true },
    price: { type: Number, required: true },
    product: [
        {
            id: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});
const laptopSchema = new Schema<laptopInterface>({
    laptopName: { type: String, required: true },
    category: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: { type: [], required: true }
})
laptopSchema.index({ laptopName: "text" }, { background: true })
const laptop = model("laptop", laptopSchema)
const order = model("order", orderSchema);
laptop.ensureIndexes();
export { laptop, order }
