import { MigrationInterface, QueryRunner } from "typeorm";
// import { ProductDb } from "../models/product";

export class Init1711218227731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Order Payment
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS order_payment (
            id SERIAL PRIMARY KEY,
            type VARCHAR(255),
            address VARCHAR(255),
            credit_card VARCHAR(255)
        );`);

    //-- Order
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS order_delivery (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255),
        address VARCHAR(255)
    );`);

    //Order Delivery
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "order" (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255),
            cart_id VARCHAR(255),
            payment_id INT,
            delivery_id INT,
            comments VARCHAR(255),
            status VARCHAR(255),
            total INT,
            FOREIGN KEY (payment_id) REFERENCES order_payment(id),
            FOREIGN KEY (delivery_id) REFERENCES order_delivery(id)
        );`);

    // Product table
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS product_db (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(255),
        description VARCHAR(255),
        price INT
    );`);

    //Delivery Cart Item
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS delivery_cart_item (
            id SERIAL PRIMARY KEY,
            cart_id UUID,
            count INT,
            product_id UUID,
            orderId INT
        );`);

    // Cart
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS cart (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id VARCHAR(255),
            is_deleted BOOLEAN
        );`);

    // Cart Item
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS cart_item (
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        cart_id UUID,
        count INT,
        product_id UUID
    );`);

    //User table
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS user_db (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255),
            role VARCHAR(255),
            password VARCHAR(255),
            token VARCHAR(255)
        );`);

    // Insert product one
    await queryRunner.query(
      `INSERT INTO product_db (id, title, description, price) 
       VALUES ('891389f0-4312-42d6-a650-6fda0959c734', 'Book', 'Interesting book', 200)
       on conflict (id) DO NOTHING
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user_db;`);
    await queryRunner.query(`DROP TABLE IF EXISTS product_db;`);
    await queryRunner.query(`DROP TABLE IF EXISTS cart_item;`);
    await queryRunner.query(`DROP TABLE IF EXISTS cart;`);
    await queryRunner.query(`DROP TABLE IF EXISTS delivery_cart_item;`);
    await queryRunner.query(`DROP TABLE IF EXISTS order_delivery;`);
    await queryRunner.query(`DROP TABLE IF EXISTS "order";`);
    await queryRunner.query(`DROP TABLE IF EXISTS order_payment;`);
  }
}
