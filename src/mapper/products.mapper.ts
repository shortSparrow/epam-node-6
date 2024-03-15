import { ProductDb } from "../data/models/product";
import {
  ProductDetailsResponse,
  ProductResponse,
} from "../features/products/product.models";

export class ProductsMapper {
  dbProductToProductResponse = (product: ProductDb): ProductResponse => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
  });
  dbProductDetailsToProductDetailsResponse = (
    product: ProductDb
  ): ProductDetailsResponse => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
  });
}
