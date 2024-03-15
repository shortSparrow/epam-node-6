import { NextFunction, Request, Response } from "express";
import { GetAllProductsService } from "./getAllProducts.service";

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productsService = new GetAllProductsService();

    const response = await productsService.getAllProducts();
    return res.status(200).json({
      data: response,
      error: null,
    });
  } catch (err) {
    next(err);
  }
};
