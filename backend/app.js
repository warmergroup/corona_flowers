import path from "path";
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product.router.js";
import authRouter from "./routes/auth.router.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";
dotenv.config();

const app = express();
const currentDir = path.resolve();

// middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(currentDir, "public")));
app.use(cookieParser());

// routes
app.use("/api/product", productRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

const API_URL = process.env.API_URL;
const PORT = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL;

const appStart = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Ma'lumotlar bazasiga muvaffaqiyatli ulandi`);
    app.listen(PORT, () =>
      console.log(`Loyiha quyidagi portda ishlamoqda - ${API_URL}`)
    );
  } catch (error) {
    console.log("DBga ulanish xatosi: ", error);
  }
};

appStart();
