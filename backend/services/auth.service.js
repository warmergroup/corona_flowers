import dotenv from "dotenv";

dotenv.config();
import UserDto from "../dtos/user.dto.js";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import TokenService from "./token.service.js";
import MailService from "./mail.service.js";
import BaseError from "../errors/base.error.js";


class AuthService {
  async register(email, password, userName) {
    const existUser = await UserModel.findOne({email});
    if (existUser) throw BaseError.BadRequestError(`Ushbu foydalanuvchi allaqachon mavjud`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      userName,
      password: hashedPassword,
    });
    const userDto = new UserDto(user);

    const tokens = await TokenService.generateToken({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {user: userDto, ...tokens};
  }

  async activation(userId) {
    const user = await UserModel.findById(userId);
    if (!user) throw BaseError.BadRequestError("Foydalanuvchi topilmadi");
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({email});
    if (!user) throw BaseError.BadRequestError("Email topilmadi");

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw BaseError.BadRequestError("Parol xato");

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateToken({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {user: userDto, ...tokens};
  }

  async logout(refreshToken) {
    await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken) {
    
    const userPayload = await TokenService.validateRefreshToken(refreshToken);
    if (!userPayload) throw BaseError.UnauthorizedError("Invalid refresh token");

    const tokenDB = await TokenService.findToken(refreshToken);
    if (!tokenDB) throw BaseError.UnauthorizedError("Token not found in DB");

    const user = await UserModel.findById(userPayload.id);
    if (!user) {
      console.log("User not found with ID:", userPayload.id);
      throw BaseError.UnauthorizedError("User not found");
    }

    const userDto = new UserDto(user);
    const tokens = await TokenService.generateToken({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {user: userDto, ...tokens};
  }

  async getUser() {
    return await UserModel.find();
  }

  async forgotPassword(email) {
    if (!email) throw BaseError.BadRequestError("Email is required");

    const user = await UserModel.findOne({email});
    if (!user) throw BaseError.BadRequestError("Ushbu email topilmadi!");

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({...userDto});

    await MailService.sendForgotPasswordMail(
      email,
      `${process.env.CLIENT_URL}/recovery-account/${tokens.accessToken}`
    );
  }

  async recoveryAccount(token, password) {
    if (!token)
      throw BaseError.BadRequestError("Something went wrong with token");

    const userData = TokenService.validateAccessToken(token);
    if (!userData) throw BaseError.UnauthorizedError();

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.findByIdAndUpdate(userData.id, {
      password: hashedPassword,
    });

    return {success: true};
  }
}

export default new AuthService();
