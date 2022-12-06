const { withSql } = require('./utils/with-sql')

withSql(async sql => {
  console.log('seeding db with test data...')

  await sql`
    UPDATE profiles SET name='♥ zhoug ♥', tagline='sup mfersss ♡ *~~~', gender='he/mfer', age='420 yrs old', location='bing bong, canada', song_url='https://soundcloud.com/panicatthedisco/i-write-sins-not-tragedies', bio_about='heyyy mfersss <3 im zhoug. i like to buidl and chill and stuffff ♥', bio_meet='♡ chill mfers who be buidlin ♡'
    WHERE mfer_id=3191;
  `

  console.log('complete!')
})
