import BaseError from "../errors/base.error.js";
import ImageModel from "../models/image.model.js";
import FileService from "./file.service.js";

class ImageService {
  async getAll({page, limit}) {
    try {
      const offset = (page - 1) * limit;
      const allImages = await ImageModel.find()
        .sort({createdAt: -1}) // Yangi ma'lumotlarni oldinda ko'rsatish uchun saralash
        .skip(offset)
        .limit(limit);
      const totalItems = await ImageModel.countDocuments();
      if (!allImages) throw BaseError.NotFoundError("Rasmlar topilmadi!");
      return {images: allImages, totalItems};
    } catch (error) {
      throw error;
    }
  }

  async create(image) {
    const {fileUrl, fileId} = await FileService.save(image);
    try {
      return await ImageModel.create({
        fileUrl,
        fileId,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    if (!id) throw BaseError.BadRequestError("Rasm IDsi zarur!");
    const imageToDelete = await ImageModel.findById(id);
    if (!imageToDelete) throw BaseError.BadRequestError("Rasm topilmadi!");
    try {
      await FileService.delete(imageToDelete.fileId);
      return await ImageModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new ImageService();
