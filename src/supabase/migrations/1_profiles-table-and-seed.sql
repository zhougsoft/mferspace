-- Create & seeds the 'profiles' table with 10,020 empty mfer records
DROP TABLE IF EXISTS profiles;

CREATE TABLE profiles (
  id int primary key,
  tagline varchar(140),
  pronouns varchar(50),
  age varchar(50),
  location varchar(100),
  link_1 varchar(50),
  link_2 varchar(50),
  link_3 varchar(50)
);

-- Seed with empty records for each existing mfer (ids 0 to 10020)
INSERT INTO
  profiles (id)
SELECT
  x.id
FROM
  generate_series(0, 10020) AS x(id);