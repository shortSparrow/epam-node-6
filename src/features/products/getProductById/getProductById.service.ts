import { ProductsRepository } from "../../../data/repositories/products.repository";
import { ProductsMapper } from "../../../mapper/products.mapper";
import { BadRequestError } from "../../../models/errors";
import { ProductDetailsResponse } from "../product.models";
import { getProductByIdValidationSchema } from "./getProductById.validation";

export class GetProductByIdService {
  constructor(
    private _productsRepository = new ProductsRepository(),
    private _productsMapper = new ProductsMapper()
  ) {}

  getProductById = async (
    productId: string
  ): Promise<BadRequestError | ProductDetailsResponse | null> => {
    const isError = this._isParamsValid(productId);
    if (isError) {
      return new BadRequestError("invalid productId");
    }

    const product = await this._productsRepository.getProductById(productId);

    if (product === null) {
      return null;
    }

    return this._productsMapper.dbProductDetailsToProductDetailsResponse(
      product
    );
  };

  private _isParamsValid = (productId: string) => {
    const result = getProductByIdValidationSchema.validate({ productId });
    return result.error;
  };
}
