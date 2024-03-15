import { NextFunction, Request, Response } from "express";
import { RegisterService } from "./register.service";
import { BadRequestError } from "../../../models/errors";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerService = new RegisterService();

    const result = await registerService.registerUser(req.body);

    if (result instanceof BadRequestError) {
      return res.status(result.code).json({
        data: null,
        error: result.message,
      });
    }

    return res.status(200).json({
      data: {
        token: result,
      },
      error: null,
    });
  } catch (err) {
    next(err);
  }
};
