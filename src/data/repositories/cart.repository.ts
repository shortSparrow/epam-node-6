import { randomUUID } from "crypto";
import { cartDb } from "../db";
import { CartDb, CartItemDb } from "../models/cart";

export class CartRepository {
  addProductToCart = async (
    userId: string,
    products: CartItemDb[]
  ): Promise<CartDb> => {
    const userCartIndex = cartDb.findIndex((cart) => cart.userId === userId);
    cartDb[userCartIndex].items.push(...products);
    cartDb[userCartIndex].isDeleted = false;

    return Promise.resolve(cartDb[userCartIndex]);
  };

  initiateCart = async (userId: string): Promise<string> => {
    const id = randomUUID();

    cartDb.push({
      id,
      userId,
      isDeleted: false,
      items: [],
    });

    return Promise.resolve(id);
  };

  getUserCart = async (userId: string): Promise<CartDb | null> => {
    const userCart = cartDb.find((cart) => cart.userId === userId);

    return Promise.resolve(userCart ?? null);
  };

  deleteUserCart = async (userId: string): Promise<boolean> => {
    const userCartIndex = cartDb.findIndex((cart) => cart.userId === userId);
    cartDb[userCartIndex].isDeleted = true;
    cartDb[userCartIndex].items = [];

    return Promise.resolve(true);
  };
}
