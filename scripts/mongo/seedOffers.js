// set DEBUG=app:* && node scripts/mongo/seedOffers.js

const chalk = require('chalk')
const debug = require('debug')('app:scripts:offers')
const MongoLib = require('../../lib/mongo')
const { offersMock } = require('../../utils/mocks/offers')

console.log("Ofertas :",offersMock)
async function seedOffers () {
  console.log("Creando...Ofertas")
  try {
    const mongoDB = new MongoLib()

    const promises = offersMock.map(async offer => {
      await mongoDB.create('offers', offer)
    })

    await Promise.all(promises)
    debug(chalk.green(`${promises.length} Offers  have been created succesfully`))
    return process.exit(0)
  } catch (error) {
    debug(chalk.red(error))
    process.exit(1)
  }
}

seedOffers()
