import { CartRepository } from "../../../data/repositories/cart.repository";
import { CartMapper } from "../../../mapper/cart.mapper";
import { NotFoundError } from "../../../models/errors";
import { GetCartSuccess } from "../cart.models";
import { getCartTotalSum } from "../utils/cart.utils";


type GetCartResponse = Promise<NotFoundError | GetCartSuccess>;

export class GetCartService {
  constructor(
    private _cartRepository = new CartRepository(),
    private _cartMapper = new CartMapper()
  ) {}

  getCart = async (userId: string): GetCartResponse => {
    const cart = await this._cartRepository.getUserCart(userId);

    if (cart === null) {
      return new NotFoundError("Cart was not found");
    }

    return {
      cart: this._cartMapper.cartDbToCartResponse(cart),
      total: getCartTotalSum(cart),
    };
  };
}
