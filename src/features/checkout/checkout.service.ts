import {
  DeliveryCartItemDb,
  ORDER_STATUS,
  OrderDb,
  OrderDeliveryDb,
  OrderPaymentDb,
} from "../../data/models/order";
import { CartRepository } from "../../data/repositories/cart.repository";
import { CheckoutRepository } from "../../data/repositories/checkout.repository";
import { OrderMapper } from "../../mapper/order.mapper";
import { BadRequestError } from "../../models/errors";
import { getCartTotalSum } from "../cart/utils/cart.utils";
import { CheckoutSuccess } from "./checkout.models";

type CheckoutResponse = Promise<BadRequestError | { order: CheckoutSuccess }>;

export class CheckoutService {
  constructor(
    private _cartRepository = new CartRepository(),
    private _checkoutRepository = new CheckoutRepository(),
    private _orderMapper = new OrderMapper()
  ) {}

  checkout = async (userId: string): CheckoutResponse => {
    const userCart = await this._cartRepository.getUserCart(userId);

    if (userCart === null) {
      return new BadRequestError("Cart is empty");
    }

    const order = await this._checkoutRepository.placeOrder(
      new OrderDb({
        userId,
        cartId: userCart.id,
        items: userCart.items.map(
          (item) =>
            new DeliveryCartItemDb({
              cartId: item.cartId,
              count: item.count,
              product: item.product,
            })
        ),
        payment: new OrderPaymentDb({
          type: "paypal",
          address: "London",
          creditCard: "1234-1234-1234-1234",
        }),
        delivery: new OrderDeliveryDb({
          type: "post",
          address: "London",
        }),
        comments: "",
        status: ORDER_STATUS.created,
        total: getCartTotalSum(userCart),
      })
    );

    return { order: this._orderMapper.orderDbToOrderResponse(order) };
  };
}
