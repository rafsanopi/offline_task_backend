import { Router, Request, Response } from "express";
import { db } from "../db";
import { NewUser, users } from "../db/schema";
import { eq, is } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRequest, authTokenMiddleWare } from "../middleware/auth";
const authRouter = Router();

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

authRouter.post(
  "/signup",
  async (req: Request<{}, {}, SignUpBody>, res: Response) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length > 0) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      // Hash password
      const hashPassword = await bcrypt.hash(password, 8);

      const newUser: NewUser = {
        name,
        email,
        password: hashPassword,
      };

      // Insert user into the database
      const [user] = await db.insert(users).values(newUser).returning();

      res.status(201).json(user);
      return;
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);

interface logInBody {
  email: string;
  password: string;
}
authRouter.post(
  "/logIn",
  async (req: Request<{}, {}, logInBody>, res: Response) => {
    try {
      const { email, password } = req.body;

      // Check if user doesn't exists
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!existingUser) {
        res.status(400).json({ message: "User doesn't exist" });
        return;
      }

      // Hash password
      const isMatched = await bcrypt.compare(password, existingUser.password);

      if (!isMatched) {
        res.status(400).json({ message: "Password is not matched" });
        return;
      }

      const token = jwt.sign({ id: existingUser.id }, "PasswordKey");

      res.status(200).json({ token, ...existingUser });
      return;
    } catch (error: any) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
);

authRouter.post("/tekenIsValid", async (req, res) => {
  /// Get the Header

  const token = req.header("x-auth-token");

  if (!token) {
    res.json(false);
    return;
  }

  //Verify If the token is valid

  const varified = jwt.verify(token, "PasswordKey");

  if (!varified) {
    res.json(false);
    return;
  }

  // Get the user data if the Token is valid

  const validToken = varified as { id: string };

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, validToken.id));

  // If valid User returns full response

  if (user) {
    res.status(200).json(user);
  }
});

authRouter.get("/", authTokenMiddleWare, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const [user] = await db.select().from(users).where(eq(users.id, req.user));

    res.status(200).json({ token: req.token, ...user });
  } catch (error) {
    res.status(200).json(false);
  }
});

export default authRouter;
