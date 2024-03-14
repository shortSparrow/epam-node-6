import { ORDER_STATUS, OrderDb } from "../../data/models/order";
import { CartRepository } from "../../data/repositories/cart.repository";
import { CheckoutRepository } from "../../data/repositories/checkout.repository";
import { NotFoundError } from "../../models/errors";
import { getCartTotalSum } from "../cart/utils/cart.utils";

type CheckoutResponse = Promise<NotFoundError | { order: OrderDb }>;

export class CheckoutService {
  constructor(
    private _cartRepository = new CartRepository(),
    private _checkoutRepository = new CheckoutRepository()
  ) {}

  checkout = async (userId: string): CheckoutResponse => {
    const userCart = await this._cartRepository.getUserCart(userId);

    if (userCart === null) {
      return new NotFoundError("Cart was not found");
    }

    const order = await this._checkoutRepository.placeOrder({
      userId,
      cartId: userCart.id,
      items: userCart.items,
      payment: {
        type: "paypal",
        address: "London",
        creditCard: "1234-1234-1234-1234",
      },
      delivery: {
        type: "post",
        address: "London",
      },
      comments: "",
      status: ORDER_STATUS.created,
      total: getCartTotalSum(userCart),
    });

    return { order };
  };
}
