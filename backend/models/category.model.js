import {Schema, model} from 'mongoose';

const categorySchema = new Schema(
  {
    categoryName: {type: String, required: true},
  },
  {timestamps: true}
);

const CategoryModel = model('Category', categorySchema);

export default CategoryModel;
