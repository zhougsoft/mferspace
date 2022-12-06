const { withSql } = require('./utils/with-sql')

withSql(async sql => {
  console.log('seeding db with data...')

  // --- UPDATE TEMPLATE ---
  // await sql`
  //   UPDATE profiles SET name='', tagline='', gender='', age='', location='', song_url='', bio_about='', bio_meet=''
  //   WHERE mfer_id=0;
  // `
  // --- --- --- --- --- ---

  // zhoug
  await sql`
    UPDATE profiles SET name='♥ zhoug ♥', tagline='we are online <3', gender='he/mfer', age='420 yrs old', location='bing bong, canada', song_url='https://soundcloud.com/panicatthedisco/i-write-sins-not-tragedies', bio_about='zhoug, oh zhoug - a dev for you. hard days & nights without pause or rue. mferspace, a nice abode? for mfers, by mfers, built with love and code <3', bio_meet='♡ buidly mfers ♡ chill mfers ♡ fun mfers ♡ dope mfers ♡ all the mfers ♡'
    WHERE mfer_id=3191;
  `

  // lobesey
  await sql`
    UPDATE profiles SET name='Lobesy', tagline='nice guys finish in the shower', gender='mfer', location='osaka', bio_about='im old', bio_meet='all of them'
    WHERE mfer_id=7235;
  `

  // s34n
  await sql`
    UPDATE profiles SET name='s34n.eth', tagline='talking bout shit is not building', gender='M', age='boomer', location='NJ, US', song_url='https://soundcloud.com/youngdayzed337/big-l-stretch-and-bobbito-show', bio_about='just another mfer', bio_meet='mfers that understand the vibe and are not too full of themselves'
    WHERE mfer_id=9296;
  `

  // anonchickenlegs
  await sql`
    UPDATE profiles SET name='anonchickenlegs', tagline='just some mfer', gender='mfer', age='69', location='420 city', song_url='https://soundcloud.com/kevin-brian-2/the-reason-hoobastank', bio_about='im just an mfer that likes to dress up in chicken costumes, buidl things and vibe', bio_meet='all of them'
    WHERE mfer_id=139;
  `

  // imp0ster
  await sql`
    UPDATE profiles SET name='no lip all ship', location='codepen purgatory', song_url='https://soundcloud.com/gladly-1/nouveau-life-start-life', bio_about='im just an mfer that likes to dress up in chicken costumes, buidl things and vibe', bio_meet='all of them'
    WHERE mfer_id=7332;
  `

  // zonko
  await sql`
    UPDATE profiles SET name='zonko', tagline='', gender='', age='', location='', song_url='', bio_about='', bio_meet=''
    WHERE mfer_id=5176;
  `

  console.log('complete!')
})
