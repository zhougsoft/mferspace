const fs = require('fs')
const path = require('path')
const { withSql } = require('./util/with-sql')

// returns array of objects parsed from CSV seed data
const readSeedData = () => {
  const csvPath = path.join(__dirname, 'util/seed-data.csv')
  return fs
    .readFileSync(csvPath, 'utf8')
    .split('\n')
    .slice(1) // skip header row
    .map(row => row.split(','))
    .map(row => ({
      mfer_id: row[0],
      name: row[1] || null,
      tagline: row[2] || null,
      gender: row[3] || null,
      age: row[4] || null,
      location: row[5] || null,
      media_url: row[6] || null,
      twitter: row[7] || null,
      bio_about: row[8] || null,
      bio_meet: row[9] || null,
    }))
}

withSql(async sql => {
  console.log('seeding db with data...')

  // TODO: seed profiles table with this data:
  // const data = readSeedData()

  // --- UPDATE TEMPLATE ---
  // await sql`
  //   UPDATE profiles SET name='', tagline='', gender='', age='', location='', media_url='', bio_about='', bio_meet=''
  //   WHERE mfer_id=0;
  // `
  // --- --- --- --- --- ---

  // zhoug
  await sql`
    UPDATE profiles SET name='♥ zhoug ♥', tagline='we are online <3', gender='he/mfer', age='420 yrs old', location='bing bong, canada', media_url='https://soundcloud.com/panicatthedisco/i-write-sins-not-tragedies', bio_about='zhoug, oh zhoug - a dev for you. hard days & nights without pause or rue. mferspace, a nice abode? for mfers, by mfers, built with love and code <3', bio_meet='♡ buidly mfers ♡ chill mfers ♡ fun mfers ♡ dope mfers ♡ all the mfers ♡'
    WHERE mfer_id=3191;
  `

  console.log('complete!')
})
