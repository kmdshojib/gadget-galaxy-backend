import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import laptopRoute from './app/modules/product/product.route';
import userRoute from './app/modules/users/userRoute';
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/v1/laptop", laptopRoute);
app.use("/api/v1/user", userRoute);

export default app;