import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    author: { type: Schema.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    discountedPrice: { type: Number },
    discountStart: { type: Date },
    discountEnd: { type: Date },
  },
  {
    timestamps: true,
  }
);

// // Modelga avtomatik chegirmali narxni hisoblash uchun o'zgarish qo'shish
// productSchema.pre("save", function (next) {
//   if (this.discount > 0 && this.discountStart && this.discountEnd) {
//     const currentDate = new Date();
//     // Faqat chegirma muddati ichida bo'lsa chegirmali narx hisoblanadi
//     if (currentDate >= this.discountStart && currentDate <= this.discountEnd) {
//       this.discountedPrice = this.price - this.price * (this.discount / 100);
//     } else {
//       this.discountedPrice = null; // Chegirma muddati tugagan bo'lsa
//     }
//   } else {
//     this.discountedPrice = null; // Chegirma yo'q bo'lsa
//   }
//   next();
// });

const productModel = model("Product", productSchema);

export default productModel;
