import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app: express.Application = express();
dotenv.config();

mongoose
  .connect(process.env.DB!)
  .then((link) => {
    console.log(`Database connected successfully | ${link.connection.host}`);
  })
  .catch((err: Error) => {
    console.log(err);
  });

app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.json({ message: "hello world" });
});

app.listen(process.env.PORT, () => {
  console.log(`Port ${process.env.PORT} Listening`);
});
