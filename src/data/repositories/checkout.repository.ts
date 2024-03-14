import { ordersDb } from "../db";
import { randomUUID } from "crypto";
import { OrderDb } from "../models/order";

export class CheckoutRepository {
  placeOrder = async (props: Omit<OrderDb, "id">): Promise<OrderDb> => {
    const id = randomUUID();
    const newOrder = { id, ...props };

    ordersDb.push(newOrder);

    return Promise.resolve(newOrder);
  };
}
