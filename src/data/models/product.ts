import mongoose, { Schema } from "mongoose";

export interface ProductDbI {
  _id: string;
  title: string;
  description: string;
  price: number;
}


const ProductSchema: Schema = new Schema({
  _id: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
});

export const ProductDb = mongoose.model<ProductDbI>("ProductDb", ProductSchema);

