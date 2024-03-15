import { CartRepository } from "../../../data/repositories/cart.repository";

type DeleteCartResponse = Promise<{ success: boolean }>;

export class DeleteCartService {
  constructor(private _cartRepository = new CartRepository()) {}

  deleteCart = async (userId: string): DeleteCartResponse => {
    const isDeleteSuccess = await this._cartRepository.deleteUserCart(userId);
    return {
      success: isDeleteSuccess,
    };
  };
}
