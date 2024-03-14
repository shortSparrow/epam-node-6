import { CartDb, CartItemDb } from "../../../data/models/cart";
import { CartRepository } from "../../../data/repositories/cart.repository";
import { NotFoundError } from "../../../models/errors";
import { getCartTotalSum } from "../utils/cart.utils";

type CartResponse = {
  userId: string;
  items: CartItemDb[];
};

type Success = {
  cart: CartResponse;
  total: number;
};

type GetCartResponse = Promise<NotFoundError | Success>;

export class GetCartService {
  constructor(private _cartRepository = new CartRepository()) {}

  getCart = async (userId: string): GetCartResponse => {
    const cart = await this._cartRepository.getUserCart(userId);

    if (cart === null) {
      return new NotFoundError("Cart was not found");
    }

    return {
      cart: cartDbToCartResponse(cart),
      total: getCartTotalSum(cart),
    };
  };
}

const cartDbToCartResponse = (cartDb: CartDb): CartResponse => ({
  userId: cartDb.userId,
  items: cartDb.items,
});
