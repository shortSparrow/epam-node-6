import { NextFunction, Request, Response } from "express";
import { LoginService } from "./login.service";
import { BadRequestError, NotFoundError } from "../../../models/errors";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginService = new LoginService();

    const loginResult = await loginService.login(req.body);

    if (
      loginResult instanceof BadRequestError ||
      loginResult instanceof NotFoundError
    ) {
      return res.status(loginResult.code).json({
        data: null,
        error: {
          message: loginResult.message,
        },
      });
    }

    return res.status(200).json({
      data: loginResult,
      error: null,
    });
  } catch (err) {
    next(err);
  }
};
