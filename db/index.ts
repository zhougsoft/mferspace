import postgres from 'postgres'

const { DATABASE_URL } = process.env
if (DATABASE_URL === undefined) throw Error('DATABASE_URL undefined in env')

const sql = postgres(DATABASE_URL as string)

export default sql
