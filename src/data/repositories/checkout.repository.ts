import { ordersDb } from "../db";
import { randomUUID } from "crypto";
import { OrderDb } from "../models/order";
import { CartRepository } from "./cart.repository";

export class CheckoutRepository {
  constructor(private _cartRepository = new CartRepository()) {}

  placeOrder = async (props: Omit<OrderDb, "id">): Promise<OrderDb> => {
    const id = randomUUID();
    const newOrder = { id, ...props };

    ordersDb.push(newOrder);

    await this._cartRepository.deleteUserCart(props.userId);

    return Promise.resolve(newOrder);
  };
}
