import { Request, Response } from "express";
import { NotFoundError } from "../../../models/errors";
import { GetCartService } from "./getCart.service";

export const getCartController = async (req: Request, res: Response) => {
  const getCartService = new GetCartService();
  const userId = req.verifiedToken?.id as string;

  const response = await getCartService.getCart(userId);

  if (response instanceof NotFoundError) {
    return res.status(response.code).json({
      data: null,
      error: response.message,
    });
  }

  return res.status(200).json({
    data: response,
    error: null,
  });
};
