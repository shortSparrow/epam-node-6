import { randomUUID } from "crypto";
import { UserDb } from "../models/user";
import { usersDb } from "../db";
import { generateAccessToken } from "../../utils/generateTokens";

export class AuthRepository {
  addUser = async (user: Omit<UserDb, "id" | "token">): Promise<UserDb> => {
    const id = randomUUID();
    const token = generateAccessToken(user.email);
    const savedUser: UserDb = { ...user, id, token: token };
    usersDb.push(savedUser);

    return Promise.resolve(savedUser);
  };

  getUserByEmail = async (email: string): Promise<UserDb | null> => {
    const existingUser = usersDb.find((user) => user.email === email);
    return Promise.resolve(existingUser ?? null);
  };
}
