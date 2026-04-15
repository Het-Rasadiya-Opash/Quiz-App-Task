import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { errorHandler } from "./middlewares/errorHandler.js";
import { dbConnection } from "./config/db.js";

const app = express();
const PORT = process.env.PORT;

import userRoutes from "./routes/user.route.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server is Running on PORT ${PORT}`);
});
