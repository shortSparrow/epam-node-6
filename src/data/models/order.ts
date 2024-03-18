import mongoose, { Schema } from "mongoose";
import { CartItemDbI } from "./cart";

export enum ORDER_STATUS {
  created = "created",
  completed = "completed",
}

export interface OrderDbI {
  _id: string;
  userId: string;
  cartId: string;
  items: CartItemDbI[];
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

const OrderSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: Array<CartItemDbI>, default: [] },
  payment: {
    type: { type: String, required: true },
    address: { type: String },
    creditCard: { type: String },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String },
  },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

export const OrderDb = mongoose.model<OrderDbI>("OrderDb", OrderSchema);
