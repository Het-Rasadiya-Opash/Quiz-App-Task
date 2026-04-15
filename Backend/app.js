import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { dbConnection } from "./config/db.js";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is ruunign");
});

app.use(errorHandler);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is Running on PORT ${PORT}`);
});
