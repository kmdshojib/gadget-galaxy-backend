import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import laptopRoute from './app/modules/product/product.route';
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

dotenv.config();

app.use("/api/v1/laptop", laptopRoute)

export default app;