import { CartDb, CartItemDb } from "../../../data/models/cart";
import { CartRepository } from "../../../data/repositories/cart.repository";
import { ProductsRepository } from "../../../data/repositories/products.repository";
import { BadRequestError, NotFoundError } from "../../../models/errors";
import { getCartTotalSum } from "../utils/cart.utils";
import { addToCartValidationSchema } from "./addToCart.validation";

type AddToCartProps = {
  productId: string;
  count: number;
  userId: string;
};

type CartResponse = {
  userId: string;
  items: CartItemDb[];
};

type Success = {
  cart: CartResponse;
  total: number;
};

type AddToCartResponse = Promise<NotFoundError | BadRequestError | Success>;

export class AddToCartService {
  constructor(
    private _cartRepository = new CartRepository(),
    private _productsRepository = new ProductsRepository()
  ) {}

  addToCart = async ({
    productId,
    count,
    userId,
  }: AddToCartProps): AddToCartResponse => {
    const validationResult = this._isParamsValid({
      productId,
      count,
      userId,
    });

    if (validationResult !== undefined) {
      return new BadRequestError(validationResult?.message);
    }

    const productDetails = await this._productsRepository.getProductById(
      productId
    );
    const userCart = await this._cartRepository.getUserCart(userId);

    if (productDetails === null) {
      return new NotFoundError("Product was not found");
    }

    if (userCart === null) {
      // return new NotFoundError('Cart was not found')
      await this._cartRepository.initiateCart(userId);
    }

    const cart = await this._cartRepository.addProductToCart(userId, [
      { count, product: productDetails },
    ]);

    return {
      cart: cartDbToCartResponse(cart),
      total: getCartTotalSum(cart),
    };
  };

  private _isParamsValid(props: AddToCartProps) {
    const validationResult = addToCartValidationSchema.validate(props);
    return validationResult.error;
  }
}

const cartDbToCartResponse = (cartDb: CartDb): CartResponse => ({
  userId: cartDb.userId,
  items: cartDb.items,
});
