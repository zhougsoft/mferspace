// postgres driver connection with common.js
// for usage with common.js migration scripts

require('dotenv').config()
const postgres = require('postgres')

const { DATABASE_URL } = process.env
if (DATABASE_URL === undefined) throw Error('DATABASE_URL undefined in .env')
const sql = postgres(DATABASE_URL)

exports.withSql = async callback => {
	try {
		await callback(sql)
		process.exit()
	} catch (error) {
		console.error(error)
		process.exit()
	}
}
