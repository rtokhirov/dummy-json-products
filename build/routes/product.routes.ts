import express from "express";
import { getProducts, searchProducts } from "../controllers/product.controller";

const productRouter = express.Router();

productRouter.get("/", getProducts);
// productRouter.get("/search", searchProducts);
// productRouter.get("/:id",);

export default productRouter;