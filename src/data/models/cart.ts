import { ProductDb } from "./product";

export interface CartItemDb {
  product: ProductDb;
  count: number;
}

export interface CartDb {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemDb[];
}
