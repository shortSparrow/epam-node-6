import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class ProductDb {
  constructor(productDb?: ProductDb) {
    if (productDb) {
      Object.assign(this, productDb);
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
