const MongoLib = require('../lib/mongo')

class NewsService {
  //Constructor para tabajar con Mongo
  constructor() {
    this.collection = 'news'
    this.mongoDB = new MongoLib()
  }

  async getNews({ tags }) {
    const query = tags && { tags: { $in: tags } }
    //const News = await Promise.resolve(NewsMock)
    const News = await this.mongoDB.getAll(this.collection, query)
    return News || []
  }

  async getNew({ NewId }) {
    console.log("id a buscar", {NewId})
    const New = await this.mongoDB.get(this.collection, NewId)
    return New || {}
  }
  async createNew({ New }) {
    const createNewId = await this.mongoDB.create(this.collection, New)
    return createNewId
  }
  async updateNew({ NewId, New } = {}) {
    const updatedNewId = await this.mongoDB.update(
      this.collection,
      NewId,
      New
    )
    return updatedNewId
  }
  async deleteNew({ NewId }) {
    const deleteNewId = await this.mongoDB.delete(this.collection, NewId)
    return deleteNewId
  }
}

module.exports = NewsService
