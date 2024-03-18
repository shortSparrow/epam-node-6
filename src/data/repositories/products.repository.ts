import { ProductDb, ProductDbI } from "../models/product";

export class ProductsRepository {
  getAllProducts = async (): Promise<ProductDbI[]> => {
    return Promise.resolve(ProductDb.find({}));
  };

  getProductById = async (productId: string): Promise<ProductDbI | null> => {
    const product = await ProductDb.findOne({ _id: productId });

    return Promise.resolve(product?.toJSON() ?? null);
  };
}
