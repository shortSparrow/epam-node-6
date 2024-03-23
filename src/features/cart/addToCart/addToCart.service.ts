import { CartItemDb } from "../../../data/models/cart";
import { CartRepository } from "../../../data/repositories/cart.repository";
import { ProductsRepository } from "../../../data/repositories/products.repository";
import { CartMapper } from "../../../mapper/cart.mapper";
import { BadRequestError, NotFoundError } from "../../../models/errors";
import { AddToCartSuccess } from "../cart.models";
import { getCartTotalSum } from "../utils/cart.utils";
import { addToCartValidationSchema } from "./addToCart.validation";

type AddToCartProps = {
  productId: string;
  count: number;
  userId: string;
};

type AddToCartResponse = Promise<
  NotFoundError | BadRequestError | AddToCartSuccess
>;

export class AddToCartService {
  constructor(
    private _cartRepository = new CartRepository(),
    private _productsRepository = new ProductsRepository(),
    private _cartMapper = new CartMapper()
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

    let userCartId: string = userCart?.id || "";
    if (productDetails === null) {
      return new NotFoundError("Product was not found");
    }

    if (userCart === null) {
      userCartId = await this._cartRepository.initiateCart(userId);
    }

    const cart = await this._cartRepository.addProductToCart(
      userId,
      new CartItemDb({
        count,
        cartId: userCartId,
        product: productDetails,
      })
    );


    return {
      cart: this._cartMapper.cartDbToCartResponse(cart),
      total: getCartTotalSum(cart),
    };
  };

  private _isParamsValid(props: AddToCartProps) {
    const validationResult = addToCartValidationSchema.validate(props);
    return validationResult.error;
  }
}
