import BaseError from "../errors/base.error.js";
import tokenService from "../services/token.service.js";

export default function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(BaseError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(BaseError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(BaseError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(BaseError.UnauthorizedError());
  }
}
