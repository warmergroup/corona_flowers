import ImageService from "../services/image.service.js";
import ImageModel from "../models/image.model.js";
import ImageDTO from "../dtos/image.dto.js";

class ImageController {

  async getAll(req, res, next) {
    const {page = 1, limit = 12} = req.query;
    try {
      const {images, totalItems} = await ImageService.getAll({page, limit});
      const imageDTOs = images.map(image => new ImageDTO(image));
      res.status(200).json({images: imageDTOs, totalItems});
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const image = await ImageService.create(req.file);
      res.status(200).json({
        message: "Fayl muvaffaqiyatli yuklandi",
        data: image,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const deletedImage = await ImageService.delete(req.params.id);
      res.status(200).json({
        message: "Rasm muvaffaqiyatli o'chirildi",
        data: deletedImage,
      });
    } catch (error) {
      next(error);
    }
  }

  async getImageStatistics(req, res, next) {
    try {
      const total = await ImageModel.countDocuments({})
      const lastThreeDays = await ImageModel.countDocuments({createdAt: {$gte: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)}})
      const lastTwentyFourHours = await ImageModel.countDocuments({createdAt: {$gte: new Date(Date.now() - 24 * 60 * 60 * 1000)}})
      res.status(200).json({total, lastThreeDays, lastTwentyFourHours})
    } catch (error) {
      next(error);
    }
  }
}

export default new ImageController();
