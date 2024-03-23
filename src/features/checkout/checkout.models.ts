import { OrderDb } from "../../data/models/order";

export interface CheckoutSuccess extends Omit<OrderDb, "payment" | "delivery"> {
  delivery: {
    type: string;
    address: string;
  };
  payment: {
    type: string;
    address: string;
    creditCard: string;
  };
}
