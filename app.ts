import * as All from "./interfaces";
import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/database";
import mountRoutes from "./routes";
import { Server } from "http";

const app: express.Application = express();

let server: Server;

dotenv.config();
connectDatabase();

app.use(express.json());
mountRoutes(app);

server = app.listen(process.env.PORT, () => {
  console.log(`App Is Listen On Port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.error(`unhandled Rejection Error ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("server shutting down ....");
    process.exit(1);
  });
});
