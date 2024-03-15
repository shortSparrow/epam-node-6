import { NextFunction, Request, Response } from "express";
import { CheckoutService } from "./checkout.service";
import { BadRequestError } from "../../models/errors";

export const checkoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkoutService = new CheckoutService();
    const userId = req.verifiedToken?.id as string;

    const response = await checkoutService.checkout(userId);

    if (response instanceof BadRequestError) {
      return res.status(response.code).json({
        data: null,
        error: response.message,
      });
    }

    return res.status(200).json({
      data: response,
      error: null,
    });
  } catch (err) {
    next(err);
  }
};
