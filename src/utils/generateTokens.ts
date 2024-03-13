import jwt from "jsonwebtoken";

export const generateAccessToken = (userEmail: string) => {
  return jwt.sign({ userEmail }, "secret_from_env", {
    expiresIn: "1d", // The user has to re-login every day, I know, I'm evil 😈😈😈
  });
};
