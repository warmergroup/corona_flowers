import dotenv from "dotenv";

dotenv.config();
import BaseError from "../errors/base.error.js";
import AuthService from "../services/auth.service.js";
// import {validationResult} from "express-validator";

const CLIENT_URL = process.env.CLIENT_URL;

class AuthController {
  // static handleValidationErrors(req, res, next) {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return next(
  //       BaseError.BadRequestError("Error with validation", {
  //         errors: errors.array(),
  //       })
  //     );
  //   }
  // }

  static setCookie(res, token) {
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS faqat ishlab chiqarish muhitida
      sameSite: 'Lax', // Lax, bu keng tarqalgan xavfsizlik o'lchovidir
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 kun
    });
  }

  async register(req, res, next) {
    try {
      const {email, password, userName} = req.body;
      const data = await AuthService.register(email, password, userName);
      AuthController.setCookie(res, data.refreshToken);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async activation(req, res, next) {
    try {
      const userId = req.params.id;
      await AuthService.activation(userId);
      return res.redirect(CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const data = await AuthService.login(email, password);
      AuthController.setCookie(res, data.refreshToken);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({message: "Successfully logged out"});
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      if (!refreshToken) throw BaseError.UnauthorizedError("Refresh token not found");
      const data = await AuthService.refresh(refreshToken);
      AuthController.setCookie(res, data.refreshToken);
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }


  async getUser(req, res, next) {
    try {
      const data = await AuthService.getUser();
      return res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      await AuthService.forgotPassword(req.body.email);
      return res.json({success: true});
    } catch (error) {
      next(error);
    }
  }

  async recoveryAccount(req, res, next) {
    try {
      const {token, password} = req.body;
      await AuthService.recoveryAccount(token, password);
      return res.json({success: true});
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
