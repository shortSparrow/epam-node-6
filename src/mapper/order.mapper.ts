import { OrderDbI } from "../data/models/order";
import { CheckoutSuccess } from "../features/checkout/checkout.models";

export class OrderMapper {
  orderDbToOrderResponse = (order: OrderDbI): CheckoutSuccess => ({
    id: order._id,
    userId: order.userId,
    cartId: order.cartId,
    items: order.items,
    payment: order.payment,
    delivery: order.delivery,
    comments: order.comments,
    status: order.status,
    total: order.total,
  });
}
