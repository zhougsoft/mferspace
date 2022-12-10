const { withSql, readProfilesCsv } = require('./utils')

withSql(async sql => {
  console.log('seeding db with data...')

  const profiles = await readProfilesCsv().catch(console.error)

  for (const p of profiles) {
    await sql`
      UPDATE profiles
      SET name=${p.name},
      tagline=${p.tagline},
      gender=${p.gender},
      age=${p.age},
      location=${p.location},
      media_url=${p.media_url},
      twitter=${p.twitter},
      bio_about=${p.bio_about},
      bio_meet=${p.bio_meet}
      WHERE mfer_id=${p.mfer_id}
    `
  }

  console.log('complete!')
})
