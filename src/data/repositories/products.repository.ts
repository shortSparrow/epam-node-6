import { productsDb } from "../db";
import { ProductDb } from "../models/product";

export class ProductsRepository {
  getAllProducts = async (): Promise<ProductDb[]> => {
    return Promise.resolve(productsDb);
  };

  getProductById = async (productId: string): Promise<ProductDb | null> => {
    const product = productsDb.find((_product) => _product.id === productId);

    return Promise.resolve(product ?? null);
  };
}
