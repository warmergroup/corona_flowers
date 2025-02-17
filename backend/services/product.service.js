import BaseError from "../errors/base.error.js";
import productModel from "../models/product.model.js";
import fileService from "./file.service.js";

class ProductService {
  async getAll() {
    const allProducts = await productModel
      .find()
      .populate("author", "userName")
      .populate("category", "categoryName")
      .sort({createdAt: -1})
    if (!allProducts) throw BaseError.NotFoundError("Mahsulotlar topilmadi!");
    return allProducts;
  }

  async create(product, author) {
    return await productModel.create({
      ...product,
      author,
    });
  }

  async delete(id) {
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) throw BaseError.NotFoundError("Mahsulot topilmadi!");
    return await productModel.findByIdAndDelete(id);
  }

  async edit(product, id) {
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) throw BaseError.NotFoundError("Mahsulot topilmadi");
    return await productModel.findByIdAndUpdate(id, product, {new: true});
  }

  async getOne(id) {
    const product = await productModel.findById(id).populate("category", "categoryName");
    if (!product) throw BaseError.BadRequestError("Mahsulot topilmadi");
    return product;
  }
}

export default new ProductService();
