import { OrderDbI } from "../../data/models/order";

export interface CheckoutSuccess extends Omit<OrderDbI, "_id"> {
  id: string;
}
