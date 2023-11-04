import { Model } from "mongoose"
import { laptop, laptopInterface, order, OrderInterface } from "./product.model"


export const addProductToDB = async (payload: laptopInterface): Promise<laptopInterface> => {
    const addProduct = new laptop(payload)
    await addProduct.save()
    return addProduct
}

export const getProductFromDB = async (page: number, pageSize: number): Promise<laptopInterface[]> => {
    const skip = (page - 1) * pageSize;
    const products = await laptop.find().skip(skip).limit(pageSize);
    return products;
}

export const getProductByIdFromDb = async (_id: string): Promise<laptopInterface | null> => {
    const product = await laptop.findOne({ _id })
    return product;
}

export const getProductByCategoryfromDB = async (category: string, page: number, pageSize: number): Promise<laptopInterface[]> => {
    const skip = (page - 1) * pageSize;
    const products = await laptop.find({ category: category }).skip(skip).limit(pageSize).exec();
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

export const getFeatuuredProductFromDb = async (): Promise<laptopInterface[]> => {
    try {
        const result = await laptop.find({ featured: true })
            .sort({ createdAt: -1 })
            .limit(4);
        return result;
    } catch (error) {
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

export const getSellerProductsFromDb = async (payload: string) => {
    try {
        const product = laptop.find({ sellerEmail: payload });
        return product
    } catch (err) {
        console.log("something went wrong", err)
    }
}

export const deleteProductFromDB = async (id: string) => {
    try {
        const product = laptop.deleteOne({ _id: id });
        return product
    } catch (error) {
        if (error) {
            throw new Error("Can't delete product")
        }
    }
}