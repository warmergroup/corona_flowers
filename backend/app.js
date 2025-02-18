import dotenv from "dotenv";

dotenv.config();
import path from "path";
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product.router.js";
import authRouter from "./routes/auth.router.js";
import categoryRouter from "./routes/category.router.js";
import imagesRouter from "./routes/images.router.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error.middleware.js";
import cors from "cors";

const app = express();
const currentDir = path.resolve();

// CORS Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(currentDir, "public")));

// Routes
app.use("/api/product", productRouter);
app.use("/api/images", imagesRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);

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
