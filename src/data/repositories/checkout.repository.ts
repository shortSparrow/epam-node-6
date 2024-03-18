import { OrderDb, OrderDbI } from "../models/order";
import { CartRepository } from "./cart.repository";

export class CheckoutRepository {
  constructor(private _cartRepository = new CartRepository()) {}

  placeOrder = async (props: Omit<OrderDbI, "_id">): Promise<OrderDbI> => {
    const newOrder = await new OrderDb({ ...props }).save();
    await this._cartRepository.deleteUserCart(props.userId);
   
    return Promise.resolve(newOrder);
  };
}
