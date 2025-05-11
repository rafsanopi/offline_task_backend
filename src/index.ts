import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(8000, () => {
  console.log("Server started at port 8000");
});
