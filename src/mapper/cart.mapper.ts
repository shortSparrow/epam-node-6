import { CartDbI } from "../data/models/cart";
import { CartResponse } from "../features/cart/cart.models";

export class CartMapper {
  cartDbToCartResponse = (cartDb: CartDbI): CartResponse => ({
    userId: cartDb.userId,
    items: cartDb.items,
  });
}
