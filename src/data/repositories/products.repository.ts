import { AppDataSource } from "../db";
import { ProductDb } from "../models/product";

export class ProductsRepository {
  getAllProducts = async (): Promise<ProductDb[]> => {
    const result = await AppDataSource.getRepository(ProductDb).find();
    return Promise.resolve(result);
  };

  getProductById = async (productId: string): Promise<ProductDb | null> => {
    const result = await AppDataSource.getRepository(ProductDb).findOneBy({
      id: productId,
    });

    return Promise.resolve(result);
  };
}
