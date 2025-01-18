import BaseError from "../errors/base.error.js";
import productModel from "../models/product.model.js";
import fileService from "./file.service.js";

class ProductService {
  async getAll() {
    const allProducts = await productModel
      .find()
      .populate("author", "userName");
    if (!allProducts) throw BaseError.NotFoundError("Mahsulotlar topilmadi!");
    return allProducts;
  }

  async create(product, picture, author) {
    const { fileUrl, fileId } = await fileService.save(picture);
    return await productModel.create({
      ...product,
      picture: { url: fileUrl, id: fileId },
      author,
    });
  }

  async delete(id) {
    if (!id) throw new Error("ID is required");

    const productToDelete = await productModel.findById(id);
    if (!productToDelete)
      throw BaseError.BadRequestError("Mahsulot topilmadi!");

    if (productToDelete.picture)
      await fileService.delete(productToDelete.picture.id);

    return await productModel.findByIdAndDelete(id);
  }

  async edit(product, id, newPicture) {
    const existingProduct = await productModel.findById(id);
    if (!existingProduct) throw BaseError.BadRequestError("Mahsulot topilmadi");

    if (newPicture) {
      await fileService.delete(existingProduct.picture.id);
      const { fileUrl, fileId } = await fileService.save(newPicture);
      product.picture = { url: fileUrl, id: fileId };
    }

    return await productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async getOne(id) {
    const product = await productModel.findById(id);
    if (!product) throw BaseError.BadRequestError("Mahsulot topilmadi");
    return product;
  }
}

export default new ProductService();
