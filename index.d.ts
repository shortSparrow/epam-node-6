import express from "express";

export type AuthToken = { email: string; id: string; role: string };

declare module "express-serve-static-core" {
  interface Request {
    verifiedToken?: AuthToken;
  }
}
