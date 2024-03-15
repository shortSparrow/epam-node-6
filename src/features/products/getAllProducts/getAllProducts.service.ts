import { ProductsRepository } from "../../../data/repositories/products.repository";
import { ProductsMapper } from "../../../mapper/products.mapper";
import { ProductResponse } from "../product.models";

export class GetAllProductsService {
  constructor(
    private _productsRepository = new ProductsRepository(),
    private _productsMapper = new ProductsMapper()
  ) {}

  getAllProducts = async (): Promise<ProductResponse[]> => {
    const products = await this._productsRepository.getAllProducts();

    return products.map((product) =>
      this._productsMapper.dbProductToProductResponse(product)
    );
  };
}
