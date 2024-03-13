import express from "express";
import registerRouter from "./features/auth/register/register.route";
import loginRouter from "./features/auth/login/login.route";

const api = express.Router()

api.use('/api', registerRouter)
api.use('/api', loginRouter)

export default api;
