import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthToken } from "../..";
import { UserRepository } from "../data/repositories/user.repository";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const userRepository = new UserRepository();

    const accessToken = authHeader?.split(" ")[1];
    const tokenIsNotBearer = authHeader?.split(" ")[0] !== "Bearer";

    if (!accessToken || tokenIsNotBearer) {
      return res
        .status(401)
        .send("Access Denied. No token or token is invalid");
    }

    jwt.verify(accessToken, "secret_from_env", async (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .send("Access Denied. No token or token is expired");
      }

      const token = decoded as AuthToken;

      const user = await userRepository.getUserByEmail(token.email);

      if (user === null) {
        return res.status(403).send("You must be authorized user");
      }
      token.id = user.id.toString();

      req.verifiedToken = token;
      next();
    });
  } catch (err) {
    next(err);
  }
};
