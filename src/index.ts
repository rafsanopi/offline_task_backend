import express from "express";
import authRouter from "./routes/auth";

const app = express();

app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.send("Welcome!!!!!!");
});

app.listen(8000, () => {
  console.log("Server started at port 8000");
});
