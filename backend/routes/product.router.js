import express from "express";
import productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorMiddleware from "../middlewares/author.middleware.js";

const router = express.Router();

router.get("/get", productController.getAll);
router.post("/create", authMiddleware, productController.create);
router.put("/edit/:id", authMiddleware, authorMiddleware, productController.edit);
router.delete("/delete/:id", authMiddleware, authorMiddleware, productController.delete);
router.get("/get-one/:id", productController.getOne);
router.get("/statistics", productController.getProductsStatistics);

export default router;
