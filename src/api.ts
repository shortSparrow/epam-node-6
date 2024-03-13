import express from "express";
import registerRouter from "./features/auth/register/register.route";
import loginRouter from "./features/auth/login/login.route";
import productsRouter from "./features/products/products.router";

const api = express.Router();
api.use("/api", registerRouter);
api.use("/api", loginRouter);
api.use("/api", productsRouter);

export default api;
