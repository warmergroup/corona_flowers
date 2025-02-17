import {validationResult} from "express-validator";
import BaseError from "../errors/base.error.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      BaseError.BadRequestError("Error with validation", {
        errors: errors.array(),
      })
    );
  }
  next();
};
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