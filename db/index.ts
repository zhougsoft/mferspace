import postgres from 'postgres'

const { DATABASE_URL } = process.env
if (!DATABASE_URL)
  throw Error(
    'DATABASE_URL not defined in .env - check README.md for setup details'
  )

const sql = postgres(DATABASE_URL as string)

export default sql
