import express from "express";
import CategoryController from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/get', CategoryController.getAll)
router.post('/create', authMiddleware, CategoryController.create)
router.delete('/delete/:id', authMiddleware, CategoryController.deleteCategory)
router.put('/update/:id', authMiddleware, CategoryController.editCategory)
router.get('/statistics', CategoryController.getCategoryStatistics)

export default router;