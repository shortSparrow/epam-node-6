import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { ProductDb } from "./product";

@Entity({ database: "my_db", name: "cart" })
export class CartDb {
  constructor(cartDb?: CartDb) {
    cartDb && Object.assign(this, cartDb);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "is_deleted" })
  isDeleted: boolean;

  @OneToMany(() => CartItemDb, (cartItemDb) => cartItemDb.cart)
  items: CartItemDb[];
}

@Entity({ database: "my_db", name: "cart_item" })
export class CartItemDb {
  constructor(cartItemDb?: Omit<CartItemDb, "id" | "cart">) {
    cartItemDb && Object.assign(this, cartItemDb);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "cart_id" })
  cartId: string;

  @Column()
  count: number;

  @ManyToOne(() => ProductDb, (productDb) => productDb.id)
  @JoinColumn({ name: "product_id" })
  product: ProductDb;

  @ManyToOne(() => CartDb, (cartDb) => cartDb.items, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "cart_id" })
  cart: CartDb;
}
