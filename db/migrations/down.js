const { withSql } = require('./utils/with-sql')

withSql(async sql => {
  console.log('migrating db down...')



  // TODO: script to migrate down db
  
  // await sql`DROP TABLE IF EXISTS users`


  console.log('complete!')
})
