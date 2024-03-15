import { CartItemDb } from "../../data/models/cart";

export interface CartResponse {
  userId: string;
  items: CartItemDb[];
}

export interface AddToCartSuccess {
  cart: CartResponse;
  total: number;
}

export interface GetCartSuccess {
  cart: CartResponse;
  total: number;
}
