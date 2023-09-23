import { Schema, model } from "mongoose";

export interface CategoriesInterface {
    categories: string[];

}
const categoriesSchema = new Schema<CategoriesInterface>({
    categories: [{ type: String, required: true }],
})
export const CategoriesModel = model("categories", categoriesSchema)