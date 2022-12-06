const { withSql } = require('./utils/with-sql')

withSql(async sql => {
  console.log('seeding db with test data...')

  await sql`
    UPDATE profiles SET name='♥ zhoug ♥', tagline='we are online <3', gender='he/mfer', age='420 yrs old', location='bing bong, canada', song_url='https://soundcloud.com/panicatthedisco/i-write-sins-not-tragedies', bio_about='zhoug, oh zhoug - a dev for you. hard days & nights without pause or rue. mferspace, a nice abode? for mfers, by mfers, built with love and code <3', bio_meet='♡ buidly mfers ♡ chill mfers ♡ fun mfers ♡ dope mfers ♡ all the mfers ♡'
    WHERE mfer_id=3191;
  `

  console.log('complete!')
})
