import { Router, Request, Response } from "express";
import { db } from "../db";
import { NewUser, users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
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

authRouter.get("/", (req, res) => {
  res.send("Login Page");
});

export default authRouter;
