import { DataSource } from "typeorm";

import {
  DeliveryCartItemDb,
  OrderDb,
  OrderDeliveryDb,
  OrderPaymentDb,
} from "./models/order";
import { ProductDb } from "./models/product";
import { UserDb } from "./models/user";
import { CartDb, CartItemDb } from "./models/cart";

import { Init1711218227731 } from "./migrations/1711218227731-init";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "admin",
  database: "my_db",
  entities: [
    UserDb,
    ProductDb,
    CartDb,
    CartItemDb,
    OrderDb,
    OrderPaymentDb,
    OrderDeliveryDb,
    DeliveryCartItemDb,
  ],
  synchronize: false,
  logging: false,
  migrationsRun: true,
  migrations: [Init1711218227731],
});

export const initDb = async () => {
  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.log("initDb error: ", err);
  }
};
