import { Router, Request } from "express";

const authRouter = Router();

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

authRouter.post("/signup", async (req: Request<{}, {}, SignUpBody>, res) => {
  try {
    // Get request body 
    // Check User already exist or not
    // Create new user and Store in db
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

authRouter.get("/", (req, res) => {
  res.send("Login Page");
});

export default authRouter;
