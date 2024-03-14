import { Request, Response } from "express";
import { AddToCartService } from "./addToCart.service";
import { BadRequestError, NotFoundError } from "../../../models/errors";

export const addToCartController = async (req: Request, res: Response) => {
  const addToCartService = new AddToCartService();
  const { productId, count } = req.body;
  const userId = req.verifiedToken?.id as string;

  const response = await addToCartService.addToCart({
    productId,
    count,
    userId,
  });

  if (
    response instanceof BadRequestError ||
    response instanceof NotFoundError
  ) {
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
