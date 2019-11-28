const MongoLib = require('../lib/mongo')

class ProductsService {
  constructor() {
    this.collection = 'products'
    this.mongoDB = new MongoLib()
  }

  async getProducts() {
    const Products = await this.mongoDB.getAll(this.collection)
    // const Products = await this.mongoDB.getAll(this.collection)
    return Products || []
  }

  async getProduct(idproduct) {
    const product = await this.mongoDB.get(this.collection, idproduct )
    return product || {}
  }

  async getProductsCat({idcategory} ) {
    console.log("id cat ", idcategory)
    const query = {idcategory: parseInt(idcategory)} 
    // && parseInt({ idcategory });
    console.log(query)
    const product = await this.mongoDB.getAll(this.collection, query )
    return product || {}

  }

  async createProduct({ product }) {
    const createProductId = await this.mongoDB.create(this.collection, product)
    return createProductId
  }

  async updateProduct({ productId, product } = {}) {
    const updatedProductId = await this.mongoDB.update(
      this.collection,
      productId,
      product
    )
    return updatedProductId
  }

  async deleteProduct({ productId }) {
    const deleteProductId = await this.mongoDB.delete(this.collection, productId)
    return deleteProductId
  }
}

module.exports = ProductsService
