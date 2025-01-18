import express from "express";
import multer from "multer";
import productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorMiddleware from "../middlewares/author.middleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const fileMiddleware = multer({ storage }).single("picture");

router.get("/get", productController.getAll);
router.post(
  "/create",
  authMiddleware,
  fileMiddleware,
  productController.create
);
router.delete(
  "/delete/:id",
  authMiddleware,
  authorMiddleware,
  productController.delete
);
router.put(
  "/edit/:id",
  authMiddleware,
  authorMiddleware,
  fileMiddleware,
  productController.edit
);
router.get("/get-one/:id", productController.getOne);

export default router;
