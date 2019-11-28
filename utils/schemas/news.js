const joi = require('@hapi/joi')

const newIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const newDetailSchema = joi.string().max(80)
const newCategorySchema = joi.number().min(1).max(999999)
const newImageSchema = joi.string().uri()
const newPriceiniSchema = joi.number().min(1).max(999999999)
const newPriceSchema = joi.number().min(1).max(999999999)
const newIdMarcaSchema = joi.number().min(1).max(999999)

const createNewSchema = {
  detail: newDetailSchema.required(),
  idcategory: newCategorySchema.required(),
  image: newImageSchema.required(),
  priceini: newPriceiniSchema.required(),
  price: newPriceSchema.required(),
  idmarca: newIdMarcaSchema.required()
}

const updateNewSchema = {
  detail: newDetailSchema.required(),
  idcategory: newCategorySchema.required(),
  image: newImageSchema.required(),
  priceini: newPriceiniSchema.required(),
  price: newPriceSchema.required(),
  idmarca: newIdMarcaSchema.required()
}

module.exports = {
  newIdSchema,
  createNewSchema,
  updateNewSchema
}
