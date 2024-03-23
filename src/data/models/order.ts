import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";

import { ProductDb } from "./product";

export enum ORDER_STATUS {
  created = "created",
  completed = "completed",
}

@Entity({ database: "my_db", name: "order_payment" })
export class OrderPaymentDb {
  constructor(payment?: Omit<OrderPaymentDb, "id">) {
    payment && Object.assign(this, payment);
  }

  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column()
  type: string;

  @Column()
  address: string;

  @Column({ name: "credit_card" })
  creditCard: string;
}

@Entity({ database: "my_db", name: "order_delivery" })
export class OrderDeliveryDb {
  constructor(delivery?: Omit<OrderDeliveryDb, "id">) {
    delivery && Object.assign(this, delivery);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  address: string;
}

@Entity({ database: "my_db", name: "order" })
export class OrderDb {
  constructor(order?: Omit<OrderDb, "id">) {
    order && Object.assign(this, order);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "cart_id" })
  cartId: string;

  @OneToOne(() => OrderPaymentDb, (payment) => payment.id)
  @JoinColumn({ name: "payment_id" })
  payment: OrderPaymentDb;

  @OneToOne(() => OrderDeliveryDb, (orderDelivery) => orderDelivery.id)
  @JoinColumn({ name: "delivery_id" })
  delivery: OrderDeliveryDb;

  @OneToMany(() => DeliveryCartItemDb, (cartItemDb) => cartItemDb.order)
  items: DeliveryCartItemDb[];

  @Column()
  comments: string;

  @Column()
  status: ORDER_STATUS;

  @Column()
  total: number;
}

@Entity()
export class DeliveryCartItemDb {
  constructor(cartItemDb?: Omit<DeliveryCartItemDb, "id" | "order">) {
    cartItemDb && Object.assign(this, cartItemDb);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "cart_id" })
  cartId: string;

  @Column()
  count: number;

  @ManyToOne(() => ProductDb, (productDb) => productDb.id)
  product: ProductDb;

  @ManyToOne(() => OrderDb, (orderDb) => orderDb.items)
  order: OrderDb;
}
