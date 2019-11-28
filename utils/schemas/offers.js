const joi = require('@hapi/joi')

const offerIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)
const offerDetailSchema = joi.string().max(80)
const offerCategorySchema = joi.number().min(1).max(999999)
const offerImageSchema = joi.string().uri()
const offerPriceiniSchema = joi.number().min(1).max(999999999)
const offerPriceSchema = joi.number().min(1).max(999999999)
const offerIdMarcaSchema = joi.number().min(1).max(999999)

const createOfferSchema = {
  detail: offerDetailSchema.required(),
  idcategory: offerCategorySchema.required(),
  image: offerImageSchema.required(),
  priceini: offerPriceiniSchema.required(),
  price: offerPriceSchema.required(),
  idmarca: offerIdMarcaSchema.required()
}

const updateOfferSchema = {
  detail: offerDetailSchema.required(),
  idcategory: offerCategorySchema.required(),
  image: offerImageSchema.required(),
  priceini: offerPriceiniSchema.required(),
  price: offerPriceSchema.required(),
  idmarca: offerIdMarcaSchema.required()
}

module.exports = {
  offerIdSchema,
  createOfferSchema,
  updateOfferSchema
}
