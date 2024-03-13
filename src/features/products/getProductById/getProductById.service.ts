import { ProductsRepository } from "../../../data/repositories/products.repository";
import { BadRequestError } from "../../../models/errors";
import { ProductResponse } from "../getAllProducts/product.models";
import { getProductByIdValidationSchema } from "./getProductById.validation";

export class GetProductByIdService {
  constructor(private _productsRepository = new ProductsRepository()) {}

  getProductById = async (
    productId: string
  ): Promise<BadRequestError | ProductResponse | null> => {
    const isError = this._isParamsValid(productId);
    if (isError) {
      return new BadRequestError("invalid productId");
    }

    const product = await this._productsRepository.getProductById(productId);

    if (product === null) {
      return null;
    }

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  };

  private _isParamsValid = (productId: string) => {
    const result = getProductByIdValidationSchema.validate({ productId });
    return result.error;
  };
}
