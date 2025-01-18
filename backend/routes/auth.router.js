import express from "express";
import authController from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validators/auth.validator.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/register", registerValidator, authController.register);
router.get("/activation/:id", authController.activation);
router.post("/login", loginValidator, authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/get-user", authMiddleware, authController.getUser);
router.post("/forgot-password", authController.forgotPassword);
router.put("/recovery-account", authController.recoveryAccount);

export default router;
