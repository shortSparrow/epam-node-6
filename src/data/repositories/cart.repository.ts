import { CartDb, CartDbI, CartItemDbI } from "../models/cart";

export class CartRepository {
  addProductToCart = async (
    userId: string,
    products: CartItemDbI[]
  ): Promise<CartDbI> => {
    const result = await CartDb.updateOne(
      { userId: userId },
      { isDeleted: false, items: products }
    );

    const cart = await CartDb.findOne({ userId: userId });

    return Promise.resolve(cart!.toJSON());
  };

  initiateCart = async (userId: string): Promise<string> => {
    const result = await new CartDb({
      userId,
      isDeleted: false,
      items: [],
    }).save();

    return Promise.resolve(result._id.toString());
  };

  getUserCart = async (userId: string): Promise<CartDbI | null> => {
    const userCart = await CartDb.findOne({ userId: userId });

    return Promise.resolve(userCart ?? null);
  };

  deleteUserCart = async (userId: string): Promise<boolean> => {
    const result = await CartDb.updateOne(
      { userId: userId },
      { isDeleted: true, items: [] }
    );

    return Promise.resolve(true);
  };
}
