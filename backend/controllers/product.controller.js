import productService from "../services/product.service.js";

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
    if (!req.file)
      return res.status(400).json({ message: "Fayl yuborilmadi!" });

    try {
      const product = await productService.create(
        req.body,
        req.file,
        req.user.id
      );
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
      const editedProduct = await productService.edit(
        req.body,
        req.params.id,
        req.file
      );
      res.status(200).json(editedProduct);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedProduct = await productService.delete(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Mahsulot topilmadi!" });
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
}

export default new ProductController();
