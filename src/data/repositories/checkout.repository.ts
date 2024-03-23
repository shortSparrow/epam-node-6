import { AppDataSource } from "../db";
import { OrderDb, OrderDeliveryDb, OrderPaymentDb } from "../models/order";
import { CartRepository } from "./cart.repository";

export class CheckoutRepository {
  constructor(private _cartRepository = new CartRepository()) {}

  placeOrder = async (props: Omit<OrderDb, "id">): Promise<OrderDb> => {
    await AppDataSource.getRepository(OrderPaymentDb).save(props.payment);
    await AppDataSource.getRepository(OrderDeliveryDb).save(props.delivery);

    const newOrder: OrderDb = await AppDataSource.getRepository(OrderDb).save(
      props
    );

    await this._cartRepository.deleteUserCart(props.userId);

    return Promise.resolve(newOrder);
  };
}
