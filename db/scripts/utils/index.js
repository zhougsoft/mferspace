const fs = require('fs')
const path = require('path')
const postgres = require('postgres')
const createCsvParser = require('csv-parser')
require('dotenv').config()

const withSql = async callback => {
  try {
    const { DATABASE_URL } = process.env
    if (DATABASE_URL === undefined) {
      throw Error('DATABASE_URL undefined in .env')
    }
    const sql = postgres(DATABASE_URL)
    await callback(sql)
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit()
  }
}

const readProfilesCsv = () => {
  return new Promise((resolve, reject) => {
    try {
      const csvPath = path.join(__dirname, 'seed-profiles.csv')
      const csvParser = createCsvParser()
      const profiles = []
      fs.createReadStream(csvPath)
        .pipe(csvParser)
        .on('data', data => {
          profiles.push(data)
        })
        .on('end', () => {
          resolve(profiles)
        })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { withSql, readProfilesCsv }
