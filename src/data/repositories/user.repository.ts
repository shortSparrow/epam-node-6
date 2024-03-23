import { UserDb } from "../models/user";
import { AppDataSource } from "../db";

export class UserRepository {
  addUser = async (user: UserDb): Promise<UserDb> => {
    const result = await AppDataSource.manager.save(user);

    return Promise.resolve(result);
  };

  getUserByEmail = async (email: string): Promise<UserDb | null> => {
    const existingUser = await AppDataSource.getRepository(UserDb).findOneBy({
      email,
    });

    return Promise.resolve(existingUser);
  };
}
