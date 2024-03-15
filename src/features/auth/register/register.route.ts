import express from "express";
import { registerController } from "./register.controller";

const registerRouter = express.Router();

registerRouter.post("/auth/register", registerController);

export default registerRouter;
