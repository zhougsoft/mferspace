const { withSql } = require('./utils')

withSql(async sql => {
  console.log('migrating db up...')

  // create profiles table
  await sql`
	  CREATE TABLE IF NOT EXISTS profiles (
			mfer_id INT PRIMARY KEY,
			name TEXT,
			tagline TEXT,
			gender TEXT,
			age TEXT,
			location TEXT,
			media_url TEXT,
			twitter TEXT,
			bio_about TEXT,
			bio_meet TEXT,
			updated_at TIMESTAMPTZ
	  )
	`

  // insert a mfer profile for each of the existing 10020 mfer ids
  await sql`
		INSERT INTO profiles(mfer_id)
		SELECT x.mfer_id
		FROM generate_series(0, 10020) AS x(mfer_id);
	`

  // create function to insert the current timestamp into 'updated_at'
  await sql`
		CREATE OR REPLACE FUNCTION trigger_set_timestamp()
		RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
		RETURN NEW; END;
		$$ LANGUAGE plpgsql;
	`

  // add trigger to profiles table to update 'updated_at' when any rows are changed
  await sql`
		CREATE TRIGGER set_timestamp
		BEFORE UPDATE ON profiles FOR EACH ROW
		EXECUTE PROCEDURE trigger_set_timestamp();
	`

  console.log('complete!')
})
