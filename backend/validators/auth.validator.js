import { body } from "express-validator";

const registerValidator = [
  body("email").isEmail().withMessage("Yaroqli email kiriting").trim(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Parol kamida 6 belgidan iborat bo'lishi kerak")
    .matches(/\d/)
    .withMessage("Parol kamida bitta raqamni o'z ichiga olishi kerak")
    .matches(/[A-Z]/)
    .withMessage("Parol kamida bitta katta harfni o'z ichiga olishi kerak")
    .trim() // Parolni trim qilish
    .escape(), // HTML turlarini qochirish
  //   body("firstName")
  //     .notEmpty()
  //     .withMessage("Ism kiritilishi kerak")
  //     .isAlpha()
  //     .withMessage("Ism faqat harflardan iborat bo'lishi kerak")
  //     .trim()
  //     .escape(),
  //   body("lastName")
  //     .notEmpty()
  //     .withMessage("Familiya kiritilishi kerak")
  //     .isAlpha()
  //     .withMessage("Familiya faqat harflardan iborat bo'lishi kerak")
  //     .trim()
  //     .escape(),
];

const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Yaroqli email kiriting")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Parol kiritilishi kerak")
    .trim()
    .escape(),
];

export { registerValidator, loginValidator };
