import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Login Page");
});

export default authRouter;
 