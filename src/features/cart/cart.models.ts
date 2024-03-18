import { CartItemDbI } from "../../data/models/cart";

export interface CartResponse {
  userId: string;
  items: CartItemDbI[];
}

export interface AddToCartSuccess {
  cart: CartResponse;
  total: number;
}

export interface GetCartSuccess {
  cart: CartResponse;
  total: number;
}
