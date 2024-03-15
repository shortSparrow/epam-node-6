import express from "express";
import { getAllProductsController } from "./getAllProducts/getAllProducts.controller";
import { getProductByIdController } from "./getProductById/getProductById.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const productsRouter = express.Router();
productsRouter.get("/products", authMiddleware, getAllProductsController);
productsRouter.get(
  "/products/:productId",
  authMiddleware,
  getProductByIdController
);

export default productsRouter;
