const MongoLib = require('../lib/mongo')

class OfferService {
  //Constructor para tabajar con Mongo
  constructor() {
    this.collection = 'offers'
    this.mongoDB = new MongoLib()
  }

  async getOffers({ tags }) {
    const query = tags && { tags: { $in: tags } }
    //const Offer = await Promise.resolve(OfferMock)
    const Offer = await this.mongoDB.getAll(this.collection, query)
    return Offer || []
  }

  async getOffer({ OfferId }) {
    const Offer = await this.mongoDB.get(this.collection, OfferId)
    return Offer || {}
  }
  async createOffer({ Offer }) {
    const createOfferId = await this.mongoDB.create(this.collection, Offer)
    return createOfferId
  }
  async updateOffer({ OfferId, Offer } = {}) {
    const updatedOfferId = await this.mongoDB.update(
      this.collection,
      OfferId,
      Offer
    )
    return updatedOfferId
  }
  async deleteOffer({ OfferId }) {
    const deleteOfferId = await this.mongoDB.delete(this.collection, OfferId)
    return deleteOfferId
  }
}

module.exports = OfferService
