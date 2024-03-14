import express from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { checkoutController } from "./checkout.controller";

const checkoutRouter = express.Router();
checkoutRouter.post("/profile/cart/checkout", authMiddleware, checkoutController);

export default checkoutRouter;
