import { CartItemDb } from "../../data/models/cart";
import { ProductDb } from "../../data/models/product";

export interface CartResponse {
  userId: string;
  // items: CartItemDb[];
  items: { product: ProductDb; count: number }[];
}

export interface AddToCartSuccess {
  cart: CartResponse;
  total: number;
}

export interface GetCartSuccess {
  cart: CartResponse;
  total: number;
}
