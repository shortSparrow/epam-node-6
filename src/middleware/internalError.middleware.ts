import { NextFunction, Request, Response } from "express";

// TODO figure out how to use it?
export const internalErrorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({
    data: null,
    error: {
      message: "Internal Server error",
    },
  });
};
