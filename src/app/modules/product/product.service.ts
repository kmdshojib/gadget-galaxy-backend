import { Model } from "mongoose"
import { laptop, laptopInterface, order, OrderInterface } from "./product.model"


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

export const getProductByCategoryfromDB = async (category: string) => {
    const products = await laptop.find({ category: category }).exec();
    return products;
}

export const getSearchformDB = async (query: string, laptopModel: Model<laptopInterface>) => {
    try {
        const search = await laptopModel.find({ $text: { $search: query } });
        return search;
    } catch (error) {
        console.error('Error searching:', error);
        throw error;
    }
}


export const addOrderData = async (payload: OrderInterface): Promise<OrderInterface> => {
    const orderedProduct = new order(payload);

    for (const product of payload.product) {
        const { id, quantity } = product;

        const data = await laptop.findOne({ _id: id });

        if (data) {
            data.quantity -= quantity;
            await data.save();
        } else {
            console.error(`Laptop with ID ${id} not found.`);
        }
    }

    await orderedProduct.save();
    return orderedProduct;
}

export const getOrdersFromDB = async (payload: string) => {
    try {
        const product = await order.find({ customerEmail: payload });
        let laptops: any = [];
        for (const order of product) {
            for (const item of order.product) {
                const laptop = await getProductByIdFromDb(item.id);
                if (laptop) {
                    laptops.push(laptop);
                }
            }
        }
        return {
            order: product,
            product: laptops
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Something went wrong");
    }
}