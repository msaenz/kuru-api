const joi = require('@hapi/joi')

const productIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const productDetailSchema = joi.string().max(80)
const productCategorySchema = joi.number().min(1).max(999999)
const productImageSchema = joi.string().uri()
const productPriceiniSchema = joi.number().min(1).max(999999999)
const productPriceSchema = joi.number().min(1).max(999999999)
const productIdMarcaSchema = joi.number().min(1).max(999999)

const createProductSchema = {
  detail: productDetailSchema.required(),
  idcategory: productCategorySchema.required(),
  image: productImageSchema.required(),
  priceini: productPriceiniSchema.required(),
  price: productPriceSchema.required(),
  idmarca: productIdMarcaSchema.required()
}

const updateProductSchema = {
  detail: productDetailSchema.required(),
  idcategory: productCategorySchema.required(),
  image: productImageSchema.required(),
  priceini: productPriceiniSchema.required(),
  price: productPriceSchema.required(),
  idmarca: productIdMarcaSchema.required()
}

module.exports = {
  productIdSchema,
  createProductSchema,
  updateProductSchema
}
