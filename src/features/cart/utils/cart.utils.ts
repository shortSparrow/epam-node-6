import { CartDbI } from "../../../data/models/cart";

export const getCartTotalSum = (cart: CartDbI): number => {
  return cart.items.reduce(
    (accumulator, currentValue) =>
      currentValue.count * currentValue.product.price + accumulator,
    0
  );
};
