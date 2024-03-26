import { UserDb } from "../models/user";
import { usersDb } from "../db";
import { randomUUID } from "crypto";
import { generateAccessToken } from "../../utils/generateTokens";

export class UserRepository {
  addUser = async (user: Omit<UserDb, "id" | "token">): Promise<UserDb> => {
    const id = randomUUID();
    const savedUser: UserDb = { ...user, id};
    usersDb.push(savedUser);

    return Promise.resolve(savedUser);
  };

  getUserByEmail = async (email: string): Promise<UserDb | null> => {
    const existingUser = usersDb.find((user) => user.email === email);
    return Promise.resolve(existingUser ?? null);
  };
}
