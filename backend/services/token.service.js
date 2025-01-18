import jwt from "jsonwebtoken";
import TokenModel from "../models/token.model.js";
import dotenv from "dotenv";
dotenv.config();

const {
  JWT_ACCESS_SECRET_KEY: ACCESS_KEY,
  JWT_REFRESH_SECRET_KEY: REFRESH_KEY,
} = process.env;

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, REFRESH_KEY, { expiresIn: "30d" });
    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    return await TokenModel.findOneAndUpdate(
      { user: userId },
      { refreshToken },
      { new: true, upsert: true }
    );
  }

  async removeToken(refreshToken) {
    return await TokenModel.findOneAndDelete({ refreshToken });
  }

  async findToken(refreshToken) {
    return await TokenModel.findOne({ refreshToken });
  }

  validateToken(token, key) {
    try {
      return jwt.verify(token, key);
    } catch {
      return null;
    }
  }

  validateRefreshToken(token) {
    return this.validateToken(token, REFRESH_KEY);
  }

  validateAccessToken(token) {
    return this.validateToken(token, ACCESS_KEY);
  }
}

export default new TokenService();
