import BaseError from "../errors/base.error.js";
import CategoryModel from "../models/category.model.js";

class CategoryService {
  async getAll() {
    const allCategory = await CategoryModel.find().sort({createdAt: -1});
    if (!allCategory) throw BaseError.NotFoundError("Kataloglar topilmadi!");
    return allCategory;
  }

  async createCategory(category) {
    const existCategory = await CategoryModel.findOne({categoryName: category.categoryName});
    if (existCategory) throw BaseError.BadRequestError(`Ushbu katalog allaqachon yaratilgan`);
    return CategoryModel.create(category);
  }

  async deleteCategory(id) {
    if (!id) throw BaseError.BadRequestError('Katalog topilmadi!');
    return CategoryModel.findByIdAndDelete(id);
  }

  async editCategory(category, id) {
    const existingCategory = await CategoryModel.findById(id);
    if (!existingCategory) throw BaseError.BadRequestError('Katalog topilmadi!');
    const isCategoryexist = await CategoryModel.findOne({categoryName: category.categoryName});
    if (isCategoryexist) throw BaseError.BadRequestError(`Ushbu katalog allaqachon mavjud`);
    return CategoryModel.findByIdAndUpdate(id, category, {new: true});
  }
}

export default new CategoryService();
