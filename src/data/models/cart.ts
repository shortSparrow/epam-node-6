import mongoose, { Schema } from "mongoose";
import { ProductDbI } from "./product";

export interface CartItemDbI {
  product: ProductDbI;
  count: number;
}

export interface CartDbI {
  _id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemDbI[];
}

const CartDbSchema: Schema = new Schema({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: Array<CartItemDbI>, default: [] },

});

export const CartDb = mongoose.model<CartDbI>("CartDb", CartDbSchema);

