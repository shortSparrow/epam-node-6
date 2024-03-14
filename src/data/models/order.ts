import { CartItemDb } from "./cart";

export enum ORDER_STATUS {
  created = "created",
  completed = "completed",
}

export interface OrderDb {
  id: string;
  userId: string;
  cartId: string;
  items: CartItemDb[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}
