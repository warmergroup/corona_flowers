class BaseError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }

  static NotFoundError(message = "Resurs topilmadi!", details = null) {
    return new BaseError(message, 404, details);
  }

  static BadRequestError(message = "Yomon so'rov!", details = null) {
    return new BaseError(message, 400, details);
  }

  static UnauthorizedError(
    message = "Avtorizatsiyadan o'tmagansiz!",
    details = null
  ) {
    return new BaseError(message, 401, details);
  }

  static ForbiddenError(message = "Ruxsat yo'q!", details = null) {
    return new BaseError(message, 403, details);
  }

  static InternalServerError(message = "Server xatoligi!", details = null) {
    return new BaseError(message, 500, details);
  }
}

export default BaseError;
