import jwt from "jsonwebtoken";
import { AuthToken } from "../..";

export const generateAccessToken = ({ email, role, id }: AuthToken) => {
  return jwt.sign({ email, role, id }, "secret_from_env", {
    expiresIn: "2h",
  });
};
