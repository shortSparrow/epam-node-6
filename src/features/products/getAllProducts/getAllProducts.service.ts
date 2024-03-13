import { ProductsRepository } from "../../../data/repositories/products.repository";
import { ProductResponse } from "./product.models";

export class GetAllProductsService {
  constructor(private _productsRepository = new ProductsRepository()) {}

  getAllProducts = async (): Promise<ProductResponse[]> => {
    const products = await this._productsRepository.getAllProducts();

    return products.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  };
}
