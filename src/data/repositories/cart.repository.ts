import { AppDataSource } from "../db";
import { CartDb, CartItemDb } from "../models/cart";

export class CartRepository {
  addProductToCart = async (
    userId: string,
    cartItem: Omit<CartItemDb, "id">
  ): Promise<CartDb> => {
    const cartItemRepo = AppDataSource.getRepository(CartItemDb);

    const item = await cartItemRepo.findOneBy({ cartId: cartItem.cartId });
    if (item) {
      item.count += Number(cartItem.count);
      await cartItemRepo.save(item);
    } else {
      await AppDataSource.getRepository(CartItemDb).insert(cartItem);
    }
    const userCart = (await this.getUserCart(userId)) as CartDb;

    return Promise.resolve(userCart);
  };

  initiateCart = async (userId: string): Promise<string> => {
    const initiatedCart = await AppDataSource.getRepository(CartDb).insert({
      userId,
      isDeleted: false,
      items: [],
    });

    return Promise.resolve(initiatedCart.raw[0]["id"]);
  };

  getUserCart = async (userId: string): Promise<CartDb | null> => {
    const userCart = await AppDataSource.getRepository(CartDb).findOne({
      where: {
        userId: userId,
      },
      relations: {
        items: {
          product: true,
        },
      },
    });

    return Promise.resolve(userCart);
  };

  deleteUserCart = async (userId: string): Promise<boolean> => {
    await AppDataSource.getRepository(CartDb).delete({ userId });

    return Promise.resolve(true);
  };
}
