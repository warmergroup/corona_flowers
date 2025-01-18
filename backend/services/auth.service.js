import UserDto from "../dtos/user.dto.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";
import mailService from "./mail.service.js";
import BaseError from "../errors/base.error.js";
import dotenv from "dotenv";
dotenv.config();

class AuthService {
  async register(email, password, userName) {
    const existUser = await userModel.findOne({ email });
    if (existUser)
      throw BaseError.BadRequestError(`Ushbu foydalanuvchi allaqachon mavjud`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      email,
      userName,
      password: hashedPassword,
    });
    const userDto = new UserDto(user);

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/auth/activation/${userDto.id}`
    );

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async activation(userId) {
    const user = await userModel.findById(userId);
    if (!user) throw BaseError.BadRequestError("Foydalanuvchi topilmadi");

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) throw BaseError.BadRequestError("Email topilmadi");

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw BaseError.BadRequestError("Parol xato");

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async logout(refreshToken) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) throw BaseError.UnauthorizedError("Bad authorization");

    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDB = await tokenService.findToken(refreshToken);
    if (!userPayload || !tokenDB)
      throw BaseError.UnauthorizedError("Bad authorization");

    const user = await userModel.findById(userPayload.id);
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { user: userDto, ...tokens };
  }

  async getUser() {
    return await userModel.find();
  }

  async forgotPassword(email) {
    if (!email) throw BaseError.BadRequestError("Email is required");

    const user = await userModel.findOne({ email });
    if (!user) throw BaseError.BadRequestError("Ushbu email topilmadi!");

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await mailService.sendForgotPasswordMail(
      email,
      `${process.env.CLIENT_URL}/recovery-account/${tokens.accessToken}`
    );
  }

  async recoveryAccount(token, password) {
    if (!token)
      throw BaseError.BadRequestError("Something went wrong with token");

    const userData = tokenService.validateAccessToken(token);
    if (!userData) throw BaseError.UnauthorizedError();

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findByIdAndUpdate(userData.id, {
      password: hashedPassword,
    });

    return { success: true };
  }
}

export default new AuthService();
