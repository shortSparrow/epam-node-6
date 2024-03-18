import { ProductDbI } from "../data/models/product";
import {
  ProductDetailsResponse,
  ProductResponse,
} from "../features/products/product.models";

export class ProductsMapper {
  dbProductToProductResponse = (product: ProductDbI): ProductResponse => ({
    id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
  });
  dbProductDetailsToProductDetailsResponse = (
    product: ProductDbI
  ): ProductDetailsResponse => ({
    id: product._id,
    title: product.title,
    description: product.description,
    price: product.price,
  });
}
