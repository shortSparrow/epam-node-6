import express from "express";
import { loginController } from "./login.controller";

const loginRouter = express.Router();

loginRouter.post("/auth/login", loginController);

export default loginRouter;
