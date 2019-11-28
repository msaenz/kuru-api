const joi = require('@hapi/joi')

const categoryIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const categoryDetailSchema = joi.string().max(80)
const categoryCategorySchema = joi.number().min(1).max(999999)
const categoryImageSchema = joi.string().uri()
const categoryPriceiniSchema = joi.number().min(1).max(999999999)
const categoryPriceSchema = joi.number().min(1).max(999999999)
const categoryIdMarcaSchema = joi.number().min(1).max(999999)

const createCategorySchema = {
  detail: categoryDetailSchema.required(),
  idcategory: categoryCategorySchema.required(),
  image: categoryImageSchema.required(),
  priceini: categoryPriceiniSchema.required(),
  price: categoryPriceSchema.required(),
  idmarca: categoryIdMarcaSchema.required()
}

const updateCategorySchema = {
  detail: categoryDetailSchema.required(),
  idcategory: categoryCategorySchema.required(),
  image: categoryImageSchema.required(),
  priceini: categoryPriceiniSchema.required(),
  price: categoryPriceSchema.required(),
  idmarca: categoryIdMarcaSchema.required()
}

module.exports = {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema
}
