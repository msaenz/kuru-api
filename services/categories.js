const MongoLib = require('../lib/mongo')

class CategoriesService {
  //Constructor para tabajar con Mongo
  constructor() {
    this.collection = 'category'
    this.mongoDB = new MongoLib()
  }

  async getCategories({ tags }) {
    const query = tags && { tags: { $in: tags } }
    //const Categories = await Promise.resolve(CategoriesMock)
    const Categories = await this.mongoDB.getAll(this.collection, query)
    return Categories || []
  }

  async getCategory({ CategoryId }) {
    const Category = await this.mongoDB.get(this.collection, CategoryId)
    return Category || {}
  }
  async createCategory({ Category }) {
    const createCategoryId = await this.mongoDB.create(this.collection, Category)
    return createCategoryId
  }
  async updateCategory({ CategoryId, Category } = {}) {
    const updatedCategoryId = await this.mongoDB.update(
      this.collection,
      CategoryId,
      Category
    )
    return updatedCategoryId
  }
  async deleteCategory({ CategoryId }) {
    const deleteCategoryId = await this.mongoDB.delete(this.collection, CategoryId)
    return deleteCategoryId
  }
}

module.exports = CategoriesService
