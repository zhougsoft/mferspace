const { withSql } = require('./utils/with-sql')

withSql(async sql => {
  console.log('seeding db with test data...')

  await sql`
    UPDATE profiles SET name='zhoug', tagline='sup mfers', bio_about='just another mfer', bio_meet='chill mfers'
    WHERE mfer_id=3191
  `

  console.log('complete!')
})
