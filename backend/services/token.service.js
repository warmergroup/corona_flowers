import dotenv from "dotenv";

dotenv.config();
import jwt from "jsonwebtoken";
import TokenModel from "../models/token.model.js";


const {
  JWT_ACCESS_SECRET_KEY: ACCESS_KEY,
  JWT_REFRESH_SECRET_KEY: REFRESH_KEY,
} = process.env;

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, ACCESS_KEY, {expiresIn: "15m"});
    const refreshToken = jwt.sign(payload, REFRESH_KEY, {expiresIn: "30d"});
    return {accessToken, refreshToken};
  }

  async saveToken(userId, refreshToken) {
    const existToken = await TokenModel.findOne({user: userId})
    if (existToken) {
      existToken.refreshToken = refreshToken
      return existToken.save()
    }
    return await TokenModel.create({user: userId, refreshToken})
  }

  async removeToken(refreshToken) {
    return await TokenModel.findOneAndDelete({refreshToken});
  }

  async findToken(refreshToken) {
    return await TokenModel.findOne({refreshToken});
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, REFRESH_KEY);
    } catch (error) {
      return null;
    }
  }

  validateAccessToken(token) {
    try {
      return jwt.verify(token, ACCESS_KEY);
    } catch (error) {
      return null
    }
  }
}

export default new TokenService();
