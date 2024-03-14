import express from "express";
import registerRouter from "./features/auth/register/register.route";
import loginRouter from "./features/auth/login/login.route";
import productsRouter from "./features/products/products.router";
import cartRouter from "./features/cart/cart.router";
import checkoutRouter from "./features/checkout/checkout.router";

const api = express.Router();
api.use("/api", registerRouter);
api.use("/api", loginRouter);
api.use("/api", productsRouter);
api.use("/api", cartRouter);
api.use("/api", checkoutRouter);

export default api;
