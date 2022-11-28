const { withSql } = require('./utils/with-sql')

withSql(async sql => {
	console.log('migrating db up...')

	// TODO: port SQL script to here

	// create profiles table
	// await sql`
	//   CREATE TABLE IF NOT EXISTS profiles (
	//       profile_id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
	//       eth_address VARCHAR(42) UNIQUE NOT NULL,
	//       bio VARCHAR
	//   )
	// `

	console.log('complete!')
})
