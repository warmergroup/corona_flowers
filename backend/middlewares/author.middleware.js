import BaseError from "../errors/base.error.js";
import productModel from "../models/product.model.js";

export default async function (req, res, next) {
  try {
    const product = await productModel.findById(req.params.id);
    const authorId = req.user.id;
    if (product.author.toString() !== authorId) {
      return next(
        BaseError.BadRequestError("Faqat muallif o'zgartira olishi mumkin")
      );
    }
    next();
  } catch (error) {
    return next(BaseError.BadRequestError("Only author can edit this product"));
  }
}

