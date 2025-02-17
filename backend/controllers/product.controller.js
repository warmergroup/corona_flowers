import productService from "../services/product.service.js";
import BaseError from "../errors/base.error.js";
import ProductModel from "../models/product.model.js";

class ProductController {
  async getAll(req, res, next) {
    try {
      const allProducts = await productService.getAll();
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    const body = req.body;
    console.log("body: ", body);
    try {
      const product = await productService.create(body, req.user.id);
      res.status(200).json({
        message: "Fayl muvaffaqiyatli yuklandi",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }


  async edit(req, res, next) {
    try {
      const editedProduct = await productService.edit(req.body, req.params.id);
      return res.status(200).json({message: "Maxsulot o'zgartirildi", data: editedProduct});
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) throw BaseError.BadRequestError('Id topilmadi!');
      const deletedProduct = await productService.delete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({message: "Mahsulot topilmadi!"});
      }
      res.status(200).json({
        message: "Mahsulot muvaffaqiyatli o'chirildi",
        data: deletedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const product = await productService.getOne(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async getProductsStatistics(req, res, next) {
    try {
      const total = await ProductModel.countDocuments({})
      const lastThreeDays = await ProductModel.countDocuments({createdAt: {$gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)}})
      const lastTwentyFourHours = await ProductModel.countDocuments({createdAt: {$gte: new Date(Date.now() - 24 * 60 * 60 * 1000)}})
      res.status(200).json({total, lastThreeDays, lastTwentyFourHours})
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
