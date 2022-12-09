const { withSql } = require('./util/with-sql')

withSql(async sql => {
  console.log('migrating db down...')

  await sql`DROP TRIGGER set_timestamp ON profiles;`
  await sql`DROP FUNCTION trigger_set_timestamp;`
  await sql`DROP TABLE profiles;`

  console.log('complete!')
})
