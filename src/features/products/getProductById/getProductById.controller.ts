import { Request, Response } from "express";
import { GetProductByIdService } from "./getProductById.service";
import { BadRequestError } from "../../../models/errors";

export const getProductByIdController = async (req: Request, res: Response) => {
  const productsService = new GetProductByIdService();
  const { productId } = req.params;

  const response = await productsService.getProductById(productId);

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
};
