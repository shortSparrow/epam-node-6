import { CartDb } from "../data/models/cart";
import { CartResponse } from "../features/cart/cart.models";

export class CartMapper {
  cartDbToCartResponse = (cartDb: CartDb): CartResponse => ({
    userId: cartDb.userId,
    items: cartDb.items,
  });
}
