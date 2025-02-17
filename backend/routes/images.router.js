import express from "express";
import multer from "multer";
import ImageController from "../controllers/image.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router()
const storage = multer.memoryStorage();
const fileMiddleware = multer({storage}).single("image");

router.get('/get', ImageController.getAll)
router.post('/create', authMiddleware, fileMiddleware, ImageController.create)
router.delete('/delete/:id', authMiddleware, ImageController.delete)
router.get('/statistics', ImageController.getImageStatistics)

export default router;