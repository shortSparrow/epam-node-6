import { NextFunction, Request, Response } from "express";
import { DeleteCartService } from "./addToCart.service";

export const deleteCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deleteCartService = new DeleteCartService();
    const userId = req.verifiedToken?.id as string;

    const response = await deleteCartService.deleteCart(userId);

    return res.status(200).json({
      data: response,
      error: null,
    });
  } catch (err) {
    next(err);
  }
};
