import express from "express";

export type AuthToken = { email: string };

declare module "express-serve-static-core" {
  interface Request {
    verifiedToken?: AuthToken;
  }
}
