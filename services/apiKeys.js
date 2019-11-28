const MongoLib = require('../lib/mongo');

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys';
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }) {

    console.log("token en services ", token)
    const [apiKey] = await this.mongoDB.getAll(this.collection, { "token": "6930f44b5730c2759402ec8d115cf4f14ac73b8fe6926f219ba3daa743d8629e" });
    console.log("apiKey services", apiKey)
    return apiKey;
  }
}

module.exports = ApiKeysService;
