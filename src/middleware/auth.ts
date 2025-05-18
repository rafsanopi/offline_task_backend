import { UUID } from "crypto";
import { Request, NextFunction, Response } from "express";

import jwt from "jsonwebtoken";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export interface AuthRequest extends Request {
  user?: UUID;
  token?: string;
}

export const authTokenMiddleWare = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  /// Get the Header

  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ message: "Unauthorize User" });
    return;
  }

  //Verify If the token is valid

  const varified = jwt.verify(token, "PasswordKey");

  if (!varified) {
    res.status(401).json({ message: "Invalid Token" });
    return;
  }

  // Get the user data if the Token is valid

  const validToken = varified as { id: UUID };

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, validToken.id));

  // If valid User returns full response

  if (!user) {
    res.status(404).json({ message: "No User found" });
  }

  req.user = validToken.id;

  req.token = token;

  next();
};
