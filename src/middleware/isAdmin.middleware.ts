import { NextFunction, Request, Response } from "express";

export const isAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.verifiedToken?.role === "admin") {
      return next();
    }

    return res.status(403).send("You don't have permission to this action");
  } catch (err) {
    next(err);
  }
};
