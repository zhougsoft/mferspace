import postgres from 'postgres'

const { DATABASE_URL } = process.env
if (!DATABASE_URL)
  throw Error(
    'DATABASE_URL not defined in .env - check README.md for setup details'
  )

const sql = postgres(DATABASE_URL as string, {
  idle_timeout: 20, // close a connection that has been idle for 20 seconds
  max_lifetime: 60 * 20, // close a connection that has existed for more than 20 minutes
})

export default sql
