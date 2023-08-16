import { laptop, laptopInterface } from "./product.model"


export const addProductToDB = async (payload: laptopInterface): Promise<laptopInterface> => {
    const addProduct = new laptop(payload)
    await addProduct.save()
    return addProduct
}

export const getProductFromDB = async (): Promise<laptopInterface[]> => {
    const products = laptop.find()
    return products;
}

export const getProductByIdFromDb = async (_id: string): Promise<laptopInterface | null> => {
    const product = await laptop.findOne({ _id })
    return product;
}