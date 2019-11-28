// set DEBUG=app:* && node scripts/mongo/seedNews.js

const chalk = require('chalk')
const debug = require('debug')('app:scripts:products')
const MongoLib = require('../../lib/mongo')
const { newsMock } = require('../../utils/mocks/news')

async function seedNews () {
  try {
    const mongoDB = new MongoLib()

    const promises = newsMock.map(async neww => {
      await mongoDB.create('news', neww)
    })

    await Promise.all(promises)
    debug(chalk.green(`${promises.length} news have been created succesfully`))
    return process.exit(0)
  } catch (error) {
    debug(chalk.red(error))
    process.exit(1)
  }
}

seedNews()
