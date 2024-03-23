import { OrderDb } from "../data/models/order";
import { CheckoutSuccess } from "../features/checkout/checkout.models";

export class OrderMapper {
  orderDbToOrderResponse = (order: OrderDb): CheckoutSuccess => ({
    id: order.id,
    userId: order.userId,
    cartId: order.cartId,
    items: order.items,
    payment: {
      type: order.payment.type,
      address: order.payment.address,
      creditCard: order.payment.creditCard,
    },
    delivery: {
      type: order.delivery.type,
      address: order.delivery.address,
    },
    comments: order.comments,
    status: order.status,
    total: order.total,
  });
}
