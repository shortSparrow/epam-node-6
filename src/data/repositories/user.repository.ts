import { UserDb, UserDbI } from "../models/user";

import { generateAccessToken } from "../../utils/generateTokens";

export class UserRepository {
  addUser = async (user: Omit<UserDbI, "_id" | "token">): Promise<UserDbI> => {
    const token = generateAccessToken(user.email);
    const savedUser = new UserDb({
      ...user,
      token: token,
    });

    const response = await savedUser.save();

    return Promise.resolve(response.toJSON());
  };

  getUserByEmail = async (email: string): Promise<UserDbI | null> => {
    const existingUser = await UserDb.findOne({ email: email });

    return Promise.resolve(existingUser?.toJSON() ?? null);
  };
}
