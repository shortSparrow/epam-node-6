import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { addToCartController } from "./addToCart/addToCart.controller";
import { getCartController } from "./getCart/getCart.controller";
import { deleteCartController } from "./deleteCart/deleteCart.controller";
import { isAdminMiddleware } from "../../middleware/isAdmin.middleware";

const cartRouter = express.Router();
cartRouter.put("/profile/cart", authMiddleware, addToCartController);
cartRouter.get("/profile/cart", authMiddleware, getCartController);
cartRouter.delete(
  "/profile/cart",
  authMiddleware,
  isAdminMiddleware,
  deleteCartController
);

export default cartRouter;
