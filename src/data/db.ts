import { CartDb } from "./models/cart";
import { OrderDb } from "./models/order";
import { ProductDb } from "./models/product";
import { UserDb } from "./models/user";

export const usersDb: UserDb[] = [];
export const productsDb: ProductDb[] = [
  {
    id: "891389f0-4312-42d6-a650-6fda0959c734",
    title: "Book",
    description: "Interesting book",
    price: 200,
  },
];
export const cartDb: CartDb[] = [];
export const ordersDb: OrderDb[] = [];
