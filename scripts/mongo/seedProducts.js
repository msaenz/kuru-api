// set DEBUG=app:* && node scripts/mongo/seedMovies.js

const chalk = require('chalk')
const debug = require('debug')('app:scripts:products')
const MongoLib = require('../../lib/mongo')
const { productsMock } = require('../../utils/mocks/products')

async function seedProducts () {
  try {
    const mongoDB = new MongoLib()

    const promises = productsMock.map(async product => {
      await mongoDB.create('products', product)
    })

    await Promise.all(promises)
    debug(chalk.green(`${promises.length} movies have been created succesfully`))
    return process.exit(0)
  } catch (error) {
    debug(chalk.red(error))
    process.exit(1)
  }
}

seedProducts()
