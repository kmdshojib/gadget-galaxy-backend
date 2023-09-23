import { Router, Request, Response } from "express";
import { CategoriesModel } from "./categoriesModel";

const categoriesRoute: any = Router();

categoriesRoute.get("/categories", async (req: Request, res: Response) => {
    try {
        const categories = await CategoriesModel.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default categoriesRoute;
