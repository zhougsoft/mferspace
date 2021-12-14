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
  link_3 varchar(50),
  created_at timestamp with time zone default timezone('utc' :: text, now()) not null
);

-- TODO: write loop to generate empty records from ids 0 to 10020
INSERT INTO
  profiles
VALUES
  (0),
  (1),
  (2),
  (4),
  (5);
-- etc, etc...