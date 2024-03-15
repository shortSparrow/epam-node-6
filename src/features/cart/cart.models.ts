import { CartItemDb } from "../../data/models/cart";

export type CartResponse = {
  userId: string;
  items: CartItemDb[];
};

export type AddToCartSuccess = {
  cart: CartResponse;
  total: number;
};

export type GetCartSuccess = {
  cart: CartResponse;
  total: number;
};
