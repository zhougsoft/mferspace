const { withSql } = require('./utils/with-sql')

withSql(async sql => {
  console.log('migrating db down...')

  await sql`DROP TABLE IF EXISTS profiles`
  await sql`DROP FUNCTION IF EXISTS trigger_set_timestamp`

  console.log('complete!')
})
