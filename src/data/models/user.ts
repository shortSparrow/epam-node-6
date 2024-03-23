import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserDb {
  constructor(user?: Omit<UserDb, "id">) {
    if (user) {
      this.email = user.email;
      this.password = user.password;
      this.role = user.role;
      this.token = user.token;
    }
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  token: string; // TODO maybe move to another table
}
