import BaseError from "../errors/base.error.js";

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  }

  return res.status(500).json({
    message: "Server xatoligi",
    details: err.message,
  });
};

export default errorMiddleware;
