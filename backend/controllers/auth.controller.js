import authService from "../services/auth.service.js";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import BaseError from "../errors/base.error.js";
dotenv.config();
const CLIENT_URL = process.env.CLIENT_URL;

class AuthController {
  static handleValidationErrors(req, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        BaseError.BadRequestError("Error with validation", {
          errors: errors.array(),
        })
      );
    }
  }

  static setCookie(res, token) {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 kun
    });
  }

  async register(req, res, next) {
    AuthController.handleValidationErrors(req, next);
    try {
      const { email, password, userName } = req.body;
      const data = await authService.register(email, password, userName);
      AuthController.setCookie(res, data.refreshToken);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async activation(req, res, next) {
    try {
      const userId = req.params.id;
      await authService.activation(userId);
      return res.redirect(CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    AuthController.handleValidationErrors(req, next);
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      if (data) AuthController.setCookie(res, data.refreshToken);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await authService.refresh(refreshToken);
      AuthController.setCookie(res, data.refreshToken);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const data = await authService.getUser();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      await authService.forgotPassword(req.body.email);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async recoveryAccount(req, res, next) {
    try {
      const { token, password } = req.body;
      await authService.recoveryAccount(token, password);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
